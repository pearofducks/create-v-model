import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { modelEmits } from '../index.js'

const test = suite('emits')

test('normal model emits', () => {
  const emits = modelEmits()
  assert.ok(Array.isArray(emits))
  assert.equal(emits[0], 'update:modelValue')
})

test('named model emits', () => {
  const emits = modelEmits({ modelName: 'foo' })
  assert.ok(Array.isArray(emits))
  assert.equal(emits[0], 'update:foo')
})

test.run()
