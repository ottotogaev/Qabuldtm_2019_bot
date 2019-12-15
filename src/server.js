var Telegrambot = require('node-telegram-bot-api');
const request = require('request');
const config = require('../config');


// Устанавливаем токен, который выдавал нам бот
try {
} catch (error) {
  console.log('Error');
}
// var token = '724992864:AAH1Pknii6xDrHHGYIBo9FWvOpPXsD9le1Q';

// Включить опрос сервера
const TOKEN = process.env.TOKEN || config.get("token");
console.log(config.get("token"))

const options = {
  webHook: {
    port: process.env.PORT
  }
}

const APP_URL = process.env.APP_URL
const bot = new Telegrambot(TOKEN, {polling: true});



// bot.setWebHook(`${APP_URL}/bot${TOKEN}`);

var url = 'http://qabul.dtm.uz/data/day.json';

function getUniversities(msg, page = 1) {
  page = parseInt(page);
  var universities = {
    301: 'Andijon davlat universiteti',
    302: 'Toshkent davlat o\'zbek tili va adabiyoti universiteti',
    303: 'Andijon mashinasozlik instituti',
    304: 'Buxoro davlat universiteti',
    305: 'Buxoro muhandislik-texnologiya instituti',
    306: 'O\'zbekiston xalqaro islom akademiyasi',
    307: 'Guliston davlat universiteti',
    308: 'Jizzax politexnika instituti',
    309: 'Namangan davlat universiteti',
    310: 'Namangan muhandislik-qurilish instituti',
    311: 'Namangan muhandislik-texnologiya instituti',
    312: 'Samarqand davlat universiteti',
    313: 'Samarqand davlat arxitektura-qurilish instituti',
    314: 'O\'zbekiston milliy universiteti',
    315: 'Toshkent davlat texnika universiteti',
    317: 'Navoiy konchilik instituti Nukus filiali',
    319: 'Navoiy davlat konchilik instituti',
    324: 'Toshkent davlat iqtisodiyot universiteti',
    325: 'Milliy raqs va xoreografiya oliy maktabi',
    326: 'O\'zbekiston davlat jahon tillari universiteti',
    327: 'Toshkent davlat sharqshunoslik instituti',
    328: 'Toshkent arxitektura-qurilish instituti',
    329: 'Milliy rassomlik va dizayn instituti',
    331: 'Toshkent to\'qimachilik va yengil sanoat instituti',
    334: 'Toshkent avtomobil yo`llarini loyihalash, qurish va ekspluatatsiyasi instituti',
    335: 'Toshkent kimyo-texnologiya instituti Shahrisabz filiali',
    336: 'Toshkent moliya instituti',
    337: 'Toshkent kimyo-texnologiya instituti',
    338: 'Toshkent tibbiyot akademiyasi Urganch filiali',
    340: 'Termiz davlat universiteti',
    341: 'Urganch davlat universiteti',
    342: 'Farg\'ona davlat universiteti',
    343: 'Farg\'ona politexnika instituti',
    344: 'Toshkent tibbiyot akademiyasi Farg\'ona filiali',
    345: 'Qarshi davlat universiteti',
    346: 'Qoraqalpoq davlat universiteti',
    347: 'Samarqand davlat chet tillar instituti',
    348: 'Termiz davlat universitetining Denov filiali',
    349: 'Toshkent pediatriya tibbiyot instituti Nukus filiali',
    350: 'Jahon iqtisodiyoti va diplomatiya universiteti',
    351: 'Jizzax davlat pedagogika instituti',
    352: 'Nukus davlat pedagogika instituti',
    353: 'Navoiy davlat pedagogika instituti',
    354: 'Toshkent viloyati Chirchiq davlat pedagogika instituti',
    355: 'Toshkent davlat pedagogika universiteti',
    356: 'Qo\'qon davlat pedagogika instituti',
    357: 'Nizomiy nomidagi Toshkent davlat pedagogika universitetining Termiz filiali',
    358: 'Toshkent davlat pedagogika universiteti Shahrisabz filiali',
    360: 'Toshkent davlat iqtisodiyot universiteti Samarqand filiali',
    361: 'Andijon tibbiyot instituti',
    362: 'Buxoro tibbiyot instituti',
    363: 'Samarqand tibbiyot instituti',
    364: 'Toshkent tibbiyot akademiyasi',
    365: 'Tashkent davlat texnika universitetining Olmaliq filiali',
    366: 'Toshkent davlat stomatologiya instituti',
    367: 'Toshkent pediatriya tibbiyot instituti',
    368: 'Toshkent tibbiyot akademiyasining Termiz filiali',
    369: 'Toshkent farmatsevtika instituti',
    370: 'Toshkent davlat texnika universiteti Qoʻqon filiali',
    371: 'Toshkent davlat agrar universiteti Andijon filiali',
    372: 'Samarqand veterinariya meditsinasi instituti',
    373: 'Toshkent davlat agrar universiteti',
    374: 'Toshkent davlat agrar universiteti Termiz filiali',
    375: 'Qarshi muhandislik - iqtisodiyot instituti',
    376: 'Toshkent irrigatsiya va qishloq xo\'jaligini mexanizatsiyalash muhandislari instituti',
    377: 'O\`zbekiston davlat san\'at va madaniyat instituti',
    378: 'O\'zbekiston davlat konservatoriyasi',
    379: 'Toshkent davlat texnika universiteti Termiz filiali',
    380: 'Toshkent axborot texnologiyalari universiteti',
    381: 'O\'zbekiston davlat san\'at va madaniyat institutining Farg\'ona mintaqaviy filiali',
    382: 'O\'zbekiston davlat jismoniy tarbiya va sport universiteti',
    383: 'Toshkent temir yo\'l transporti muhandislari instituti',
    384: 'Toshkent davlat yuridik universiteti',
    385: 'Samarqand iqtisodiyot va servis instituti',
    386: 'Toshkent davlat agrar universiteti Nukus filiali',
    388: 'Toshkent axborot texnologiyalari universiteti Samarqand filiali',
    389: 'Toshkent axborot texnologiyalari universiteti Qarshi filiali',
    390: 'Toshkent axborot texnologiyalari universiteti Urganch filiali',
    391: 'Toshkent axborot texnologiyalari universiteti Nukus filiali',
    392: 'Toshkent axborot texnologiyalari universiteti Farg\'ona filiali',
    393: 'O\`zbekiston davlat san\'at va madaniyat instituti Nukus filiali',
    394: 'Toshkent irrigatsiya va qishloq xo\'jaligini mexanizatsiyalash muhandislari instituti Buxoro filiali',
    395: 'O\'zbekiston jurnalistika va ommaviy kommunikatsiyalar universiteti',
    396: '"Ipak yo\'li" turizm xalqaro universiteti',
    398: 'Samarqand veterinariya meditsinasi instituti Nukus filiali',
    397: 'Toshkent irrigatsiya va qishloq xoʻjaligini mexanizatsiyalash muhandislari instituti Qarshi filiali',
    399: 'Oʻzbekiston davlat jismoniy tarbiya va sport universiteti Nukus filiali',
    400: 'Toshkent davlat yuridik universiteti Ixtisoslashtirilgan filiali',
    401: 'O\'zbekiston milliy universiteti Jizzax filiali',
    402: 'Toshkent kimyo-texnologiya instituti Yangiyer filiali'
  }

  var page_count = Math.ceil(Object.keys(universities).length / 10)
  var UniversitiesList = Object.keys(universities).slice(10 * (page - 1), 10 * page).reduce((result, key) => {
    result[key] = universities[key];
    return result;
  }, {});

  const keyb_university = [];
  for (var otm_id in UniversitiesList) {
    keyb_university.push([{
      text: universities[otm_id],
      callback_data: 'lang_' + otm_id
    }])
  }

  if (page > 1 && page < page_count) {
    keyb_university.push([{
        text: 'Avvalgi',
        callback_data: 'getUniversities_' + (page - 1)
      },
      {
        text: page,
        callback_data: 'getUniversities_' + (page)
      },
      {
        text: 'Keyingi',
        callback_data: 'getUniversities_' + (page + 1)
      },
    ]);
  } else if (page <= 1) {
    keyb_university.push([{
        text: page,
        callback_data: 'getUniversities_' + (page)
      },
      {
        text: 'Keyingi',
        callback_data: 'getUniversities_' + (page + 1)
      },
    ]);
  } else {
    keyb_university.push([{
        text: 'Avvalgi',
        callback_data: 'getUniversities_' + (page - 1)
      },
      {
        text: page,
        callback_data: 'getUniversities_' + (page)
      }
    ])
  }


  if (msg.message) {
    var chat_id = msg.message.chat.id
  } else {
    var chat_id = msg.chat.id
  }


  bot.sendMessage(chat_id, '*OTM ni tanlang:*', {
    parse_mode: 'markdown',
    disable_web_page_preview: true,
    'reply_markup': {
      inline_keyboard: keyb_university
    }
  });
  if (msg.message) {
    bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
  }
}

function getLanguages(msg, otm_id) {
  request({
    url: url,
    json: true
  }, function (err, res, body) {
    var languages = {
      1: '🇺🇿 O\'zbekcha',
      2: '🇷🇺 Ruscha',
      3: "🏴󠁵󠁺󠁱󠁲󠁿Qoraqalpoqcha",
      4: '🇹🇯 Tojikcha',
      5: '🇰🇿 Qozoqcha',
      6: '🇹🇲 Turkmancha',
      7: '🇰🇬 Qirgizcha'
    }

    var languagesList = body[otm_id];
    var keyboard = [];
    for (lang_id in languagesList) {
      keyboard.push([{
        text: languages[lang_id],
        callback_data: 'edutype_' + otm_id + '_' + lang_id
      }]);
    }

    keyboard.push([{
      text: '⬅️Orqaga',
      callback_data: 'gotoBack_'
    }]);

    bot.sendMessage(msg.message.chat.id, '*Ta\'lim tilini tanlang:*', {
      parse_mode: 'markdown',
      disable_web_page_preview: true,
      'reply_markup': {
        inline_keyboard: keyboard
      }
    })

    if (msg.message) {
      bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
    }
  })
}

function eduType(msg, otm_id, lang_id) {

  var edutypeTexts = {
    1: 'Kunduzgi',
    4: 'Kechki',
    3: 'Sirtqi'
  }
  request({
    url: url,
    json: true
  }, function (err, res, body) {
    var tatu_edutype = body[otm_id][lang_id];
    var keyb_edutype = [];
    for (edutype in tatu_edutype) {
      keyb_edutype.push([{
        text: edutypeTexts[edutype],
        callback_data: 'yunalish_' + otm_id + '_' + lang_id + '_' + edutype
      }]);
    }

    keyb_edutype.push([{
      text: '⬅️Orqaga',
      callback_data: 'gotoBack2_' + otm_id
    }]);

    bot.sendMessage(msg.message.chat.id, '*Ta\'lim shaklini tanlang:*', {
      parse_mode: 'markdown',
      disable_web_page_preview: true,
      'reply_markup': {
        inline_keyboard: keyb_edutype
      }
    })
    bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
  })
}

function yunalish(msg, otm_id, lang_id, eduType_id) {

  request({
    url: url,
    json: true
  }, function (err, res, body) {

    // if (err) throw err

    var tatu_yunalish = body[otm_id][lang_id][eduType_id];

    var keyb_yunalish = [];
    for (yunalish_id in tatu_yunalish) {

      if (tatu_yunalish[yunalish_id]["name"]) {
        keyb_yunalish.push([{
          text: tatu_yunalish[yunalish_id]["name"],
          callback_data: 'data_' + otm_id + '_' + lang_id + '_' + eduType_id + '_' + yunalish_id
        }]);
      }
    }
    keyb_yunalish.push([{
      text: '⬅️Orqaga',
      callback_data: 'gotoBack3_' + otm_id + '_' + lang_id
    }])

    bot.sendMessage(msg.message.chat.id, '*Yunalishni tanlang:*', {
      parse_mode: 'markdown',
      disable_web_page_preview: true,
      'reply_markup': {
        inline_keyboard: keyb_yunalish
      }
    })

    bot.deleteMessage(msg.message.chat.id, msg.message.message_id)

  })
}

function dataInfo(msg, otm_id, lang_id, eduType_id, yunalish_id) {

  request({
    url: url,
    json: true
  }, function (err, res, body) {

    if (err) throw err

    var data = body[otm_id][lang_id][eduType_id][yunalish_id];

    if (!data['g']) {
      data['g'] = '0'
    }

    bot.sendMessage(msg.message.chat.id, data['name'] + ':' + '\n\n' + 'Grant: ' + data['g'] + '\n' + 'Kontrakt: ' + data['k'] + '\n\n' + '1 - ta\'lim yo\'nalishi sifatida tanlaganlar soni: ' + data['all1'] + '\n' + '2 - ta\'lim yo\'nalishi sifatida tanlaganlar soni: ' + data['all2'] + '\n' + '3 - ta\'lim yo\'nalishi sifatida tanlaganlar soni: ' + data['all3'] + '\n' + '1 - ta\'lim yo\'nalishga nisbatan tanlov ' + data['all1'] / (data['g'] + data['k']), {
      // parse_mode: 'markdown',
      disable_web_page_preview: true,
      'reply_markup': {

        inline_keyboard: [
          [{
            text: '⬅️Orqaga',
            callback_data: 'gotoBack4_' + otm_id + '_' + lang_id + '_' + eduType_id
          }]
        ]

      }
    });

    bot.deleteMessage(msg.message.chat.id, msg.message.message_id);

  })
}
// console.log(opt);

bot.onText(new RegExp('\/start'), (msg) => {

  getUniversities(msg);

});

// '*Assalomu Alaykum!*\nIltimos botdan foydalanish uchun o\'zingizga mos tilni tanlang \n\n*Здравствуйте*! \nЧтобы начать пользоваться с ботом, выберьте вам подходящий язык'

bot.on('callback_query', (msg) => {
  action = msg.data.split('_');

  if (action[0] == 'getUniversities') {
    getUniversities(msg, action[1]);
  }
  
  if (action[0] == 'lang') {
    // console.log(action[1]);
    getLanguages(msg, action[1]);
  }

  if (action[0] == 'gotoBack') {
    getUniversities(msg);
  }

  if (action[0] == 'edutype') {

    // console.log(msg);
    eduType(msg, action[1], action[2]);
  }

  if (action[0] == 'yunalish') {

    yunalish(msg, action[1], action[2], action[3])

  }
  if (action[0] == 'data') {

    dataInfo(msg, action[1], action[2], action[3], action[4]);

  }
  if (action[0] == 'gotoBack2') {

    // console.log(action[0])
    getLanguages(msg, action[1]);

  }
  if (action[0] == 'gotoBack3') {
    eduType(msg, action[1], action[2])

  }

  if (action[0] == 'gotoBack4') {
    yunalish(msg, action[1], action[2], action[3])
  }

});


console.log('Server is Running ....');
