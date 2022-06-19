import './_setup.js'
import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import sinon from 'sinon'
import { ref } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { modelProps, createModel } from '../index.js'

const test = suite('model')
test.after(() => {
  window.happyDOM.cancelAsync()
})

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
  const wrapper = shallowMount(component, {
    props: {
      modelValue,
      'onUpdate:modelValue': modelUpdater
    }
  })
  assert.is(wrapper.props('modelValue').value, 'foo')
  wrapper.componentVM.model = 'bar'
  assert.is(wrapper.props('modelValue').value, 'bar')
})

test('normal model update via emit', async () => {
  const { modelValue, modelUpdater } = getModelFixtures()
  const component = createComponent({
    props: modelProps(),
    setup: (p, { emit }) => ({ model: createModel({ props: p, emit }) })
  })
  const wrapper = shallowMount(component, {
    props: {
      modelValue,
      'onUpdate:modelValue': modelUpdater
    }
  })
  assert.is(wrapper.props('modelValue').value, 'foo')
  wrapper.componentVM.model = 'bar'
  assert.is(wrapper.props('modelValue').value, 'bar')
})

test('emitter', async () => {
  const emitter = sinon.fake()
  const { modelValue, modelUpdater } = getModelFixtures()
  const component = createComponent({
    props: modelProps(),
    setup: (p) => ({ model: createModel({ props: p, emit: emitter }) })
  })
  const wrapper = shallowMount(component, {
    props: {
      modelValue,
      'onUpdate:modelValue': modelUpdater
    }
  })
  wrapper.componentVM.model = 'bar'
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
  const wrapper = shallowMount(component, {
    props: {
      modelValue,
      modelModifiers,
      'onUpdate:modelValue': modelUpdater
    }
  })
  assert.is(wrapper.props('modelValue').value, 'foo')
  wrapper.componentVM.model = 'bar'
  assert.is(wrapper.props('modelValue').value, 'bar')
  modelModifiers.value.change = true
  wrapper.componentVM.model = 'baz'
  assert.is(wrapper.props('modelValue').value, 'baz')
})

test('named model creation', async () => {
  const component = createComponent({
    props: modelProps({ modelName: 'foo' }),
    setup: (p) => ({ model: createModel({ props: p, modelName: 'foo' }) })
  })
  const { modelValue, modelUpdater } = getModelFixtures()
  const wrapper = shallowMount(component, {
    props: {
      foo: modelValue,
      'onUpdate:foo': modelUpdater
    }
  })
  assert.is(wrapper.props('foo').value, 'foo')
  wrapper.componentVM.model = 'bar'
  assert.is(wrapper.props('foo').value, 'bar')
})


test.run()
