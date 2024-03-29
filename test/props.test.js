import './_setup.js'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { shallowMount } from '@vue/test-utils'
import { modelProps } from '../index.js'

const test = suite('props')
test.after(() => {
  window.happyDOM.cancelAsync()
})

const createComponent = ({ props }) => ({
  template: '<p>{{ $props.modelValue }}</p>', // we use $props here to avoid a Vue warning
  props
})

test('normal model props', () => {
  const modelValue = 'value'
  const cb = () => {}
  const component = createComponent({
    props: modelProps()
  })
  const wrapper = shallowMount(component, {
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

test('default value for prop', () => {
  const modelDefault = Symbol()
  const component = createComponent({
    props: modelProps({ modelDefault })
  })
  const wrapper = shallowMount(component)
  assert.is(wrapper.props('modelValue'), modelDefault)
})

test('named model props', () => {
  const foo = 'value'
  const cb = () => {}
  const component = createComponent({
    props: modelProps({ modelName: 'foo' })
  })
  const wrapper = shallowMount(component, {
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
