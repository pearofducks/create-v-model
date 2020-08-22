import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { modelProps, namedModelProps, createModel, createModifierModel, createNamedModel } from '../index'

const test = suite('model')
const createComponent = (props, setup) => ({ template: '<p>unused</p>', props, setup })
const getModelProps = () => {
  const modelValue = ref('foo')
  const modelUpdater = v => modelValue.value = v
  const modelModifiers = ref({
    change: false
  })
  return { modelValue, modelUpdater, modelModifiers }
}

test('normal model creation', async () => {
  const { modelValue, modelUpdater } = getModelProps()
  const component = createComponent(modelProps(), (p) => ({ model: createModel(p) }))
  const wrapper = mount(component, {
    props: {
      modelValue,
      'onUpdate:modelValue': modelUpdater
    }
  })
  assert.is(wrapper.props('modelValue'), 'foo')
  wrapper.componentVM.model = 'bar'
  await nextTick()
  assert.is(wrapper.props('modelValue'), 'bar')
})

test('modifier model creation', async () => {
  const cb = (v, modelModifiers) => modelModifiers.change ? 'change' : v
  const component = createComponent(modelProps(), (p) => ({ model: createModifierModel(cb)(p) }))
  const { modelValue, modelUpdater, modelModifiers } = getModelProps()
  const wrapper = mount(component, {
    props: {
      modelValue,
      modelModifiers,
      'onUpdate:modelValue': modelUpdater
    }
  })
  assert.is(wrapper.props('modelValue'), 'foo')
  wrapper.componentVM.model = 'bar'
  await nextTick()
  assert.is(wrapper.props('modelValue'), 'bar')
  modelModifiers.value.change = true
  wrapper.componentVM.model = 'baz'
  await nextTick()
  assert.is(wrapper.props('modelValue'), 'change')
})

test('named model creation', async () => {
  const component = createComponent(namedModelProps('foo')(), (p) => ({ model: createNamedModel('foo')(p) }))
  const { modelValue, modelUpdater } = getModelProps()
  const wrapper = mount(component, {
    props: {
      foo: modelValue,
      'onUpdate:foo': modelUpdater
    }
  })
  assert.is(wrapper.props('foo'), 'foo')
  wrapper.componentVM.model = 'bar'
  await nextTick()
  assert.is(wrapper.props('foo'), 'bar')
})

test.run()
