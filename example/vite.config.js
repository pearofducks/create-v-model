import vue from '@vitejs/plugin-vue'
import path from 'path'

module.exports = {
  plugins: [vue()],
  resolve: {
    alias: {
      '/@createVModel': path.resolve(__dirname, '..')
    }
  }
}
