import { Story, Meta } from '@storybook/react/types-6-0'
import Signin from '.'

export default {
  title: 'Signin',
  component: Signin
} as Meta

export const Default: Story = () => <Signin />
