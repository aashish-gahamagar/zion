import { ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

export interface InputFieldConfig {
  appearance?: MatFormFieldAppearance;
  color?: ThemePalette;
  className?: string;
  readonly?: boolean;
}
