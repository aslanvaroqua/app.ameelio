export default (imageSrc, message) => `
  <html>
  <head>
    <meta charset="UTF-8">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400' rel='stylesheet' type='text/css'>
    <title>Inmate Letter Template</title>
    <style>
      *,
      *:before,
      *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      body {
        width: 8.5in;
        height: 11in;
        margin: 0;
        padding: 0;
        font-family: 'Open Sans';
      }
      .page {
        page-break-after: always;
      }
      .page-content {
        position: relative;
        width: 7in;
        height: 10.625in;
        left: 0.75in;
        top: 0.1875in;
      }
      .image {
        text-align: center;
      }
      #logo {
        margin-top: 20px;
      }
      .wrapper {
        position: absolute;
        top: 2.75in;
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="page-content">
        <div class='wrapper'>
          <p class="image"><img id="Photo" src=${imageSrc} width="420px" /></p>
          <p>${message}</p>
         </div>
      </div>
    </div>
  </body>
  </html>
  `;