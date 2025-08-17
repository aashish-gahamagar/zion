import { normalize, strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  FileEntry,
  forEach,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import * as path from 'path';

export interface Schema {
  name: string;
  path?: string;
  project?: string;
}

const toUnderscoreUpperCase = (value: string): string =>
  strings.underscore(value).toUpperCase();

const stripTemplateExtension = () =>
  forEach((file: FileEntry): FileEntry | null => {
    if (file.path.endsWith('.template')) {
      const newPath = normalize(file.path.replace('.template', ''));
      return { path: newPath, content: file.content };
    }
    return null;
  });

const detetctDefaultPath = (tree: Tree) => {
  const possibleFiles = ['tsconfig.json', 'angular.json', 'src/app/app.ts'];

  for (const file of possibleFiles) {
    if (tree.exists(file)) {
      return path.dirname(file);
    }
  }

  const workspaceRoot = process.cwd();
  return normalize(workspaceRoot);
};

export function addInput(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const basePath = options.path ?? detetctDefaultPath(tree);
    const dasherizedFolderName = strings.dasherize(`input-${options.name}`);
    const directoryPath = normalize(`${basePath}/${dasherizedFolderName}`);

    context.logger.info(`Generating custom input at: ${directoryPath}`);

    const generatedFiles = apply(url('./files'), [
      template({
        ...strings,
        toUnderscoreUpperCase,
        ...options,
      }),
      stripTemplateExtension(),
      move(directoryPath),
    ]);

    const rules: Rule[] = [mergeWith(generatedFiles)];

    return chain(rules);
  };
}
