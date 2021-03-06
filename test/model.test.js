import 'abdomen/setup'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import sinon from 'sinon'
import { ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { modelProps, createModel, createModelFactory } from '../index.js'

const test = suite('model')

const createComponent = ({ props, setup }) => ({ template: '<p>unused</p>', props, setup })
const getModelFixtures = () => {
  const modelValue = ref('foo')
  const modelUpdater = v => modelValue.value = v
  const modelModifiers = ref({
    change: false
  })
  return { modelValue, modelUpdater, modelModifiers }
}

test('normal model creation', async () => {
  const { modelValue, modelUpdater } = getModelFixtures()
  const component = createComponent({
    props: modelProps(),
    setup: (p) => ({ model: createModel({ props: p }) })
  })
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

test('normal model update via emit', async () => {
  const { modelValue, modelUpdater } = getModelFixtures()
  const component = createComponent({
    props: modelProps(),
    setup: (p, { emit }) => ({ model: createModel({ props: p, emit }) })
  })
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

test('emitter', async () => {
  const emitter = sinon.fake()
  const { modelValue, modelUpdater } = getModelFixtures()
  const component = createComponent({
    props: modelProps(),
    setup: (p) => ({ model: createModel({ props: p, emit: emitter }) })
  })
  const wrapper = mount(component, {
    props: {
      modelValue,
      'onUpdate:modelValue': modelUpdater
    }
  })
  wrapper.componentVM.model = 'bar'
  await nextTick()
  assert.is(emitter.callCount, 1)
  assert.is(emitter.firstArg, 'update:modelValue')
  assert.is(emitter.lastArg, 'bar')
})

test('modifier model creation', async () => {
  const cb = (v, modelModifiers) => modelModifiers.change ? 'change' : v
  const component = createComponent({
    props: modelProps(),
    setup: (p) => ({ model: createModel({ props: p, modifier: cb }) })
  })
  const { modelValue, modelUpdater, modelModifiers } = getModelFixtures()
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
  const component = createComponent({
    props: modelProps({ modelName: 'foo' }),
    setup: (p) => ({ model: createModel({ props: p, modelName: 'foo' }) })
  })
  const { modelValue, modelUpdater } = getModelFixtures()
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
