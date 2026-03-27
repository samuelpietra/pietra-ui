import { create } from '@storybook/theming'

const sharedBrandProps = {
  brandTitle: 'Pietra UI',
  brandUrl: 'https://github.com/samuelpietra/pietra-ui',
  brandTarget: '_blank',
}

export default {
  light: create({
    ...sharedBrandProps,
    base: 'light',
    brandImage: 'images/full-logo-light.svg',
    // Base colors
    colorPrimary: '#CC6030',
    colorSecondary: '#CC6030',
    // Toolbar colors
    barHoverColor: '#CC6030',
    barSelectedColor: '#CC6030'
  }),
  dark: create({
    ...sharedBrandProps,
    base: 'dark',
    brandImage: 'images/full-logo-dark.svg',
    // Base colors
    colorPrimary: '#CC8050',
    colorSecondary: '#CC8050',
    // Toolbar colors
    barBg: '#212225',
    barHoverColor: '#CC8050',
    barSelectedColor: '#CC8050'
  }),
}
