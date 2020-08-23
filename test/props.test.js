import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { mount } from '@vue/test-utils'
import { modelProps, namedModelProps } from '../index'

const test = suite('props')

const createComponent = props => ({
  template: '<p>{{ $props.modelValue }}</p>', // we use $props here to avoid a Vue warning
  props
})

test('normal model props', () => {
  const modelValue = 'value'
  const cb = () => {}
  const component = createComponent(modelProps())
  const wrapper = mount(component, {
    props: {
      modelValue,
      'onUpdate:modelValue': cb
    }
  })

  assert.is(wrapper.text(), modelValue)
  assert.is(wrapper.props('modelValue'), modelValue)
  assert.is(wrapper.props('onUpdate:modelValue'), cb)
  assert.equal(wrapper.props('modelModifiers'), {})
})

test('named model props', () => {
  const foo = 'value'
  const cb = () => {}
  const component = createComponent(namedModelProps('foo')())
  const wrapper = mount(component, {
    props: {
      foo,
      'onUpdate:foo': cb
    }
  })

  assert.not(wrapper.text(), foo)
  assert.is(wrapper.props('foo'), foo)
  assert.is(wrapper.props('onUpdate:foo'), cb)
  assert.equal(wrapper.props('fooModifiers'), {})
})

test.run()
