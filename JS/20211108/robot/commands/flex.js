import flex from '../template/flex.js'

export default async (event) => {
  flex.altText = '哈囉'
  flex.contents.contents[0].body.contents[0].text = '123'
  event.reply(flex)
}
