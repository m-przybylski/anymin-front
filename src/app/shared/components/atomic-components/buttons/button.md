# Usage:

`import {ButtonComponent} from '..../shared.module';`

Selectors: `[plat-icon-button]`, `[plat-stroked-button]`, `[plat-button]`, `[plat-mini-flat-fab]`, `[plat-flat-fab]`

| Attribute           | Description                          |
| ------------------- | ------------------------------------ |
| plat-stroked-button | regural button with border           |
| plat-icon-button    | button with icon rounded             |
| plat-flat-fab       | floating rounded button with color   |
| plat-mini-flat-fab  | floated square button without border |
| plat-button         | button without border                |
| plat-flat           | flat filled button                   |

Properties

| Name                                                                         | Description |
| ---------------------------------------------------------------------------- | ----------- |
| `@Input() color: 'primary' | 'secondary' | 'danger' | 'success' | undefined` | Theme color |
