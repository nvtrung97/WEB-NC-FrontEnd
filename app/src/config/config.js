module.exports = global.config = {
    API: 'https://dev.webnc.mangvientrieu.codes/api/v1',
    LOCALSTORAGE_NAME: 'webnc_user',
    THUMBNAIL_PLACEHOLDER: 'https://via.placeholder.com/444',
    CLIENT_ID: process.env.NODE_ENV == 'development' ? '815350976526-kem3lh8prvspmiv39l3g00op631p236m.apps.googleusercontent.com' : '815350976526-nq3bge9lo5slts3ti1qsrhu0m0ar0qp9.apps.googleusercontent.com'
  };
  