const User = require("../databases/userRegistration");
const fs = require("fs");
const path = require("path");
const Nexmo = require('nexmo')
const nexmoConfig =require("./nexmo.json");
const otpmanager = require("../nexmo-otp/src/OtpManager")
const baseRepositoryPath = "./otpItems";


// -----------------------------  otpItem ------------------------------
class OtpItem {
    constructor(token, code) {
      this.token = token;
      this.code = code;
      this.creationDate = new Date();
      this.isChecked = false;
      this.checkDate = null;
    }
  }

// -----------------------------  otpManager ------------------------------

  const VerificationResults = {
    valid: Symbol("valid"),
    notValid: Symbol("notValid"),
    expired: Symbol("expired"),
    checked: Symbol("checked")
  };
  
  class OtpManager {
    constructor(otpRepository, options) {
      this.VerificationResults = VerificationResults;
      this.otpRepository = otpRepository;
      this.options = options || {otpLength: 4, validityTime: 2};
    }
  
    create(token) {
      const code = Math.floor(Math.random()*Math.pow(10, this.options.otpLength)).toString().padStart(this.options.otpLength, "0");
      let otp = new OtpItem(token, code);
      this.otpRepository.add(otp);
  
      return otp;
    }
  
    verify(token, code) {
      const id = `${token}-${code}`;
      const otp = this.otpRepository.getById(id);
      let verificationResult = VerificationResults.notValid;
    
      if (otp) {
        switch (true) {
          case otp.isChecked:
            verificationResult = VerificationResults.checked;
            break;
          case isOtpExpired(otp, this.options.validityTime):
            verificationResult = VerificationResults.expired;
            break;
          default:
            otp.isChecked = true;
            otp.checkDate = new Date();
            this.otpRepository.update(otp);
            verificationResult = VerificationResults.valid;
    
        }
      }
    
      return verificationResult;
    }
  }
  
  function isOtpExpired(otp, validityTime) {
    const minutesSinceCreation = Math.floor(((new Date() - new Date(otp.creationDate)) % 3.6e6) / 6e4);
  
    return (minutesSinceCreation > validityTime);
  }

// -----------------------------  otpRepository ------------------------------


  function add(otpItem) {
    checkBaseFolder();
    fs.writeFileSync(path.join(baseRepositoryPath, `${otpItem.token}-${otpItem.code}`), JSON.stringify(otpItem));
  }
  
  function getById(id) {
    const content = getFileContent(path.join(baseRepositoryPath, id));
    let otpItem = null;
    
    if (content) {
      otpItem = JSON.parse(content);
    }
  
    return otpItem;
  }
  
  function update(otpItem) {
      fs.writeFileSync(path.join(baseRepositoryPath, `${otpItem.token}-${otpItem.code}`), JSON.stringify(otpItem));
  
      return otpItem;
  }
  
  function checkBaseFolder() {
    if (!fs.existsSync(baseRepositoryPath)){
      fs.mkdirSync(baseRepositoryPath);
    }
  }
  
  function getFileContent(fileName) {
    let content = null;
    
    try {
      content = fs.readFileSync(fileName);
    } catch (error) {
      console.log(error);
    }
  
    return content;
  }


// -----------------------------  otpSender ------------------------------



nexmoConfig.privateKey = path.join(__dirname, "private.key");

const nexmo = new Nexmo(nexmoConfig);

function send(otp, recipientAdresses) {
  const message = `Insert the following code: ${otp.code}`;

  nexmo.dispatch.create("failover", [
    {
      "from": { "type": "messenger", "id": "YOUR_MESSENGER_ID" },
      "to": { "type": "messenger", "id": recipientAdresses.messengerId },
      "message": {
        "content": {
          "type": "text",
          "text": message
        }
      },
      "failover":{
        "expiry_time": 120,
        "condition_status": "read"
      }
    },
    {
      "from": {"type": "sms", "number": "NEXMO"},
      "to": { "type": "sms", "number": recipientAdresses.phoneNumber},
      "message": {
        "content": {
          "type": "text",
          "text": message
        }
      }
    },
    (err, data) => { 
      console.log(data.dispatch_uuid); 
    
    }
  ]),(err)  =>{
    console.log(err)
  }
}

function createotp(req, res) {
    const otp = otpmanager.create(req.params.token);
    
    otpSender.send(otp, req.body);
    res.sendStatus(201);
   };
  

function verifyingotp(req, res) {
    const verificationResults = otpManager.VerificationResults;
    const verificationResult = otpManager.verify(req.params.token, req.params.code);
    let statusCode;
    let bodyMessage;

    switch (verificationResult) {
      case verificationResults.valid:
        statusCode = 200;
        bodyMessage = "OK";
        break;
      case verificationResults.notValid:
        statusCode = 404;
        bodyMessage = "Not found"
        break;
      case verificationResults.checked:
        statusCode = 409;
        bodyMessage = "The code has already been verified";
        break;
      case verificationResults.expired:
        statusCode = 410;
        bodyMessage = "The code is expired";
        break;
      default:
        statusCode = 404;
        bodyMessage = "The code is invalid for unknown reason";
  }
  res.status(statusCode).send(bodyMessage);
};

module.exports={
    OtpItem:OtpItem,
    OtpManager:OtpManager,
    getById:getById,
    add: add,
    update:update,
    send:send,
    createotp:createotp,
    verifyingotp:verifyingotp
}