/**
 * @file Ads config / ES module
 * @module ad.config
 * @author GuoGuang <https://github.com/GuoGuang>
 */

 // const apiConfig = require('./api.config.js')
// const imagePath = apiConfig.cdnUrl+`/images/mammon/`
const imagePath = `https://static-admin.madaoo.com/`


const links = {
  common: {
    aliyun: 'https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=e9jpi67b'
  },
  pc: {
    taobao: 'https://s.click.taobao.com/hWjWFKw',
    alitrip: 'https://s.click.taobao.com/VTsaFKw',
    dingding: 'https://s.click.taobao.com/DUIbFKw'
  },
  mobile: {
    taobao: 'https://s.click.taobao.com/jbDWFKw',
    alitrip: 'https://s.click.taobao.com/PBVLEKw'
  }
}

// 移动端广告
const mobile = {
  aside: {
    taobao: links.mobile.taobao,
    aliyun: links.common.aliyun
  }
}

// pc 端链接广告
const pc = {
  nav: {
    taobao: links.pc.taobao,
    aliyun: links.common.aliyun
  },
  carrousel:
    {
      url: links.common.aliyun,
      src: imagePath + 'aliyun-532-178.jpg'
    }
  ,
  asideSwiper: [
    {
      url: links.common.aliyun,
      src: imagePath + 'aliyun-532-178.jpg'
    },
  ]
}

// 公共广告
const common = {

  // 相关文章 -> 智能广告
  articleRelated(tags, isMobile) {

    const text = tags.map(tag => tag.name + tag.description).join()
    const isCategory = tags => tags.some(tag => text.includes(tag))

    const ads = [
      {
        tags: ['诗', '远方', '旅行', '世界', '人生', '思考', '生活'],
        ad: {
          link: isMobile ? links.mobile.alitrip : links.pc.alitrip,
          title: '有梦就出发吧！',
          img: imagePath + 'alitrip-290-224.jpg'
        }
      }
    ]

    const defaultAliyunAd = {
      link: links.common.aliyun,
      title: '一款优秀的弹性主机很重要！',
      img: imagePath + 'aliyun-290-224.jpg'
    }

    const findAd = ads.find(ad => isCategory(ad.tags))
    const resultAd = findAd ? findAd.ad : defaultAliyunAd
    return Object.assign(resultAd, { ad: true })
  }
}

export default { pc, mobile, common }
