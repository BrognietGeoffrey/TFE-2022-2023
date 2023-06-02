import react from 'react';


const EmailTemplate = (billAdded, logsAdded, billUnpaid ) => { 
    
    return `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-24p67 {
        width: 148.02px !important;
      }
    
      .u-row .u-col-25p16 {
        width: 150.96px !important;
      }
    
      .u-row .u-col-50p17 {
        width: 301.02px !important;
      }
    
      .u-row .u-col-100 {
        width: 600px !important;
      }
    
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table, td { color: #000000; } @media (max-width: 480px) { #u_content_heading_1 .v-container-padding-padding { padding: 30px 10px !important; } #u_content_heading_1 .v-font-size { font-size: 30px !important; } #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 80% !important; } #u_content_text_5 .v-container-padding-padding { padding: 10px !important; } #u_content_image_2 .v-container-padding-padding { padding: 30px 10px !important; } #u_content_image_2 .v-src-width { width: auto !important; } #u_content_image_2 .v-src-max-width { max-width: 45% !important; } #u_column_3 .v-col-background-color { background-color: #ffffff !important; } #u_column_3 .v-col-border { border-top: 1px solid #000000 !important;border-left: 0px solid transparent !important;border-right: 0px solid transparent !important;border-bottom: 1px solid #000000 !important; } #u_content_heading_3 .v-container-padding-padding { padding: 30px 10px 0px !important; } #u_content_heading_3 .v-text-align { text-align: center !important; } #u_content_text_2 .v-container-padding-padding { padding: 5px 40px 30px !important; } #u_content_text_2 .v-text-align { text-align: center !important; } #u_content_heading_2 .v-container-padding-padding { padding: 30px 10px !important; } #u_content_image_3 .v-container-padding-padding { padding: 30px 10px !important; } #u_content_image_3 .v-src-width { width: auto !important; } #u_content_image_3 .v-src-max-width { max-width: 45% !important; } #u_column_6 .v-col-border { border-top: 1px solid #000000 !important;border-left: 0px solid transparent !important;border-right: 0px solid transparent !important;border-bottom: 1px solid #000000 !important; } #u_content_heading_4 .v-container-padding-padding { padding: 30px 10px 0px !important; } #u_content_heading_4 .v-text-align { text-align: center !important; } #u_content_text_3 .v-container-padding-padding { padding: 5px 40px 30px !important; } #u_content_heading_5 .v-container-padding-padding { padding: 30px 10px !important; } #u_content_image_4 .v-container-padding-padding { padding: 30px 10px !important; } #u_content_image_4 .v-src-width { width: auto !important; } #u_content_image_4 .v-src-max-width { max-width: 45% !important; } #u_column_9 .v-col-border { border-top: 1px solid #000000 !important;border-left: 0px solid transparent !important;border-right: 0px solid transparent !important;border-bottom: 1px solid #000000 !important; } #u_content_heading_6 .v-container-padding-padding { padding: 30px 10px 0px !important; } #u_content_heading_6 .v-text-align { text-align: center !important; } #u_content_text_4 .v-container-padding-padding { padding: 5px 40px 30px !important; } #u_content_text_4 .v-text-align { text-align: center !important; } #u_content_heading_7 .v-container-padding-padding { padding: 30px 10px !important; } }
        </style>
      
      
    
    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Rubik:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css2?family=Arvo&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ecf0f1;"><![endif]-->
        
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-background-color v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table id="u_content_heading_1" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 30px;font-family:'Rubik',sans-serif;" align="left">
            
      <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: Arvo; font-size: 35px; font-weight: 400;"><strong>Rapport journalier</strong></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_image_1" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px;font-family:'Rubik',sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1667301163823-header.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 60%;max-width: 348px;" width="348" class="v-src-width v-src-max-width"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_5" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 80px;font-family:'Rubik',sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 160%;">Bonjour, voici un rapport journalier</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="148" class="v-col-background-color v-col-border" style="background-color: #ffffff;width: 148px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-24p67" style="max-width: 320px;min-width: 148.02px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_image_2" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px;font-family:'Rubik',sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://cdn-icons-png.flaticon.com/512/972/972601.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 70%;max-width: 89.61px;" width="89.61" class="v-src-width v-src-max-width"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="301" class="v-col-background-color v-col-border" style="background-color: #ffffff;width: 301px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_3" class="u-col u-col-50p17" style="max-width: 320px;min-width: 301.02px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_3" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 0px;font-family:'Rubik',sans-serif;" align="left">
            
      <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: Arvo; font-size: 18px; font-weight: 400;"><strong>Nombre de facture(s) ajoutée(s)</strong></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_2" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 10px;font-family:'Rubik',sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 14px; color: #34495e; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">Voici le nombre de facture(s)/facturier(s) ajoutée aujourd'hui</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-background-color v-col-border" style="background-color: #ffffff;width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-25p16" style="max-width: 320px;min-width: 150.96px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_2" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:80px 10px 25px;font-family:'Rubik',sans-serif;" align="left">
            
      <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: Arvo; font-size: 26px; font-weight: 400;"><strong>${billAdded}</strong></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="148" class="v-col-background-color v-col-border" style="background-color: #ffffff;width: 148px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-24p67" style="max-width: 320px;min-width: 148.02px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_image_3" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px;font-family:'Rubik',sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="data:image/png;base64,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" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 63%;max-width: 80.65px;" width="80.65" class="v-src-width v-src-max-width"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="301" class="v-col-background-color v-col-border" style="background-color: #ffffff;width: 301px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_6" class="u-col u-col-50p17" style="max-width: 320px;min-width: 301.02px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_4" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 0px;font-family:'Rubik',sans-serif;" align="left">
            
      <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: Arvo; font-size: 18px; font-weight: 400;"><strong>Nombre de logs pour ce jour</strong></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_3" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 10px;font-family:'Rubik',sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 14px; color: #34495e; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">Voici le nombre de logs pour aujourd'hui</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-background-color v-col-border" style="background-color: #ffffff;width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-25p16" style="max-width: 320px;min-width: 150.96px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_5" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 25px;font-family:'Rubik',sans-serif;" align="left">
            
      <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: Arvo; font-size: 26px; font-weight: 400;"><strong>${logsAdded}</strong></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="148" class="v-col-background-color v-col-border" style="background-color: #ffffff;width: 148px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-24p67" style="max-width: 320px;min-width: 148.02px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_image_4" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px;font-family:'Rubik',sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="data:image/png;base64,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" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 63%;max-width: 80.65px;" width="80.65" class="v-src-width v-src-max-width"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="301" class="v-col-background-color v-col-border" style="background-color: #ffffff;width: 301px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div id="u_column_9" class="u-col u-col-50p17" style="max-width: 320px;min-width: 301.02px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_6" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 0px;font-family:'Rubik',sans-serif;" align="left">
            
      <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: Arvo; font-size: 18px; font-weight: 400;"><strong>Nombre total de facture(s) impayée(s)</strong></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table id="u_content_text_4" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 10px;font-family:'Rubik',sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 14px; color: #34495e; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">Voici le nombre total de factures(s) impayée(s)</p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-background-color v-col-border" style="background-color: #ffffff;width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-25p16" style="max-width: 320px;min-width: 150.96px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table id="u_content_heading_7" style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:33px 10px 25px;font-family:'Rubik',sans-serif;" align="left">
            
      <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: Arvo; font-size: 26px; font-weight: 400;"><strong>${billUnpaid}</strong></h1>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-background-color v-col-border" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div class="v-col-background-color" style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:'Rubik',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:'Rubik',sans-serif;" align="left">
            
      <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%;">jeanvives.be </p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>`
    


}

export default EmailTemplate;