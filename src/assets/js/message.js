export default class Message {
  constructor() {}

  static getContextByMessage(string) {
    const msgObj = JSON.parse(string);
    const { mimeT, data } = msgObj;
    const formatMethod = this.getMessageType(mimeT);
    return formatMethod(data);
  }

  static getMessageType(mimeT) {
    const typeList = {
      1: Message.formatByText,
      2: Message.formatByGif,
      3: Message.formatByGift,
      4: Message.formatByPicture,
      5: Message.formatByVideo,
      25: Message.formatByGame,
    };
    return typeList[mimeT];
  }

  static formatByText(data) {
    const { c } = data;
    return {
      ctx: c,
      title: c,
    };
  }

  static formatByGif(data) {
    const { url, thumb_url } = data;
    return {
      ctx: {
        url,
        thumb_url,
      },
      title: '[图片]',
    };
  }

  static formatByGift(data) {
    const { url, thumb_url } = data;
    return {
      ctx: {
        url,
        thumb_url,
      },
      title: '[礼物]',
    };
  }

  static formatByPicture(data) {
    const { url, thumb_url } = data;
    return {
      ctx: {
        url,
        thumb_url,
      },
      title: '[图片]',
    };
  }

  static formatByVideo(data) {
    const { url, thumb_url } = data;
    return {
      ctx: {
        url,
        thumb_url,
      },
      title: '[视频]',
    };
  }

  static formatByGame(data) {
    const { url, thumb_url } = data;
    return {
      ctx: {
        url,
        thumb_url,
      },
      title: '[游戏]',
    };
  }
}
