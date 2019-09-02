const OSS = require('ali-oss')
const fs = require('fs')
const path = require('path')
// const os = require('os')
const PUBLIC_PATH = path.join(__dirname, '/')

const client = new OSS({
  accessKeyId: '<yourAccessKeyId>',
  accessKeySecret: '<yourAccessKeySecret>',
  bucket: 'vue-admin-guoguang',
  region: 'oss-cn-shanghai'
})

/**
 *获取文件目录并删除
 * @param {*} dir //文件目录
 */
async function deleteDir(dir) {
  const result = await client.list({
    prefix: dir + '/',
    delimiter: '/'
  })
  if (result.objects) {
    const aa = []
    result.objects.forEach(function(obj) {
      aa.push(obj.name)
    })
    try {
      await client.deleteMulti(aa, {
        quiet: true
      })
      console.log('删除成功')
    } catch (e) {
      console.log('文件删除失败', e)
    }
  }
}

/**
 * 遍历文件夹递归上传
 * @param {path} src 本地路径
 * @param {string} dist oos文件夹名 www|kouzi
 */
function addFileToOSSSync(src, dist) {
  const docs = fs.readdirSync(src)
  docs.forEach(function(doc) {
    const _src = src + '/' + doc
    // const _dist = dist + '/' + doc
    console.log('前：' + dist)

    const _dist = src.indexOf('images') !== -1 ? dist + '/' + doc : '/' + doc // 所有文件上传到一个目录下
    console.log('后：' + _dist)

    const st = fs.statSync(_src)
    // 判断是否为文件
    if (st.isFile() && doc !== '.DS_Store') {
      putOSS(_src, _dist)
    } else if (st.isDirectory()) {
      // 如果是目录则递归调用自身
      addFileToOSSSync(_src, _dist)
    }
  })
}
/**
 *单个文件上传至oss
 */
async function putOSS(src, dist) {
  try {
    await client.put('/icode/_nuxt' + dist, src)
  } catch (e) {
    console.log('上传失败'.e)
  }
}
/**
 *上传文件启动
 *@param {string} dirName 将要上传的文件名
 */
async function upFile(dirName) {
  try {
    await deleteDir('/icode/_nuxt')
    await addFileToOSSSync(PUBLIC_PATH + '.nuxt', dirName)
    await addFileToOSSSync(PUBLIC_PATH + 'static', dirName) // static 目录下资源上传到CDN
    console.log(dirName + '上传oss成功')
  } catch (err) {
    console.log(dirName + '上传oss成功失败', err)
  }
}

upFile('')
