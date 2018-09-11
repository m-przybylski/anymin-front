# Usage:

`import {ButtonComponent} from '..../shared.module';`

Selectors: `[plat-button]`, `[plat-icon-button]`, `[plat-stroked-button]`, `[plat-mini-flat-fab]`, `[plat-flat-fab]`, `[plat-large-button]`, `[plat-stroked-large-button]`

| Attribute                 | Description                          |
| ------------------------- | ------------------------------------ |
| plat-stroked-button       | regural button with border           |
| plat-icon-button          | button with icon rounded             |
| plat-flat-fab             | floating rounded button with color   |
| plat-mini-flat-fab        | floated square button without border |
| plat-button               | regural button                       |
| plat-large-button         | large button                         |
| plat-flat                 | flat filled button                   |
| plat-stroked-large-button | large stroked button                 |

Properties

| Name                                                                         | Description |
| ---------------------------------------------------------------------------- | ----------- |
| `@Input() color: 'primary' | 'secondary' | 'danger' | 'success' | undefined` | Theme color |
