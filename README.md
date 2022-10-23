
# mv3-solid-chrome-extension-template

<img src="./demo.gif" width=600></img>

chrome-extension development template with firebase 

Support 
- [x] Chrome Extension
- [x] Manifest V3
- [x] SolidJS
- [x] Typescript
- [x] HMR
- [x] Firebase Authentication


# Quick Start 

## Install
```
git clone https://github.com/munron/mv3-solid-chrome-extension-template.git
cd mv3-vue-solid-extension-template
npm install
mv .env.sample .env
```

## Fix Extension ID

#### Open `chrome://extensions`
#### Click Pack Extension
#### Click `Browse` and select `dist` folder
`dist.crx` and `dist.pem` are generated.

<img src="https://gyazo.com/20b05012fc8d0bb3c4a82d016de08e3a/max_size/1000" width=600></img>

#### Edit `.env`
Copy private key from `dist.pem` and paste to `VITE_MV3_KEY` 

```txt:.env
VITE_FIREBASE_APIKEY=XXXXXXXX
VITE_FIREBASE_AUTHDOMAIN=XXXXXXXX
VITE_FIREBASE_PROJECTID=XXXXXXXX
VITE_FIREBASE_STORAGEBUCKET=XXXXXXXX
VITE_FIREBASE_MESSAGINGSENDERID=XXXXXXXX
VITE_FIREBASE_APPID=XXXXXXXX
VITE_MEASUREMENTID=XXXXXXXX
VITE_OAUTH2_CLIENT_ID=XXXXXXXX
VITE_MV3_KEY="-----BEGIN PRIVATE KEY-----\nXXXXX.....XXXXXX\n....\nXXXXXX.....XXXXXXX\n-----END PRIVATE KEY-----"
```

## Setup Firebase

#### Create New Project
[https://console.firebase.google.com](https://console.firebase.google.com)

#### Copy Firebase Configuration to `.env`

```js
const firebaseConfig = {
   apiKey: "XXX",
   authDomain: "XXX",
   projectId: "XXX",
   storageBucket: "XXX",
   messagingSenderId: "XXX",
   appId: "XXX",
   measurementId: "XXX"
};
```

#### Add Google to Sign-in provider
Build → Authentication → Sign-in method → Google → Save

<img src="https://user-images.githubusercontent.com/8764140/197352128-de3de8e3-0d58-4204-b305-03bc7f0258ec.png" width=600></img>
<img src="https://gyazo.com/f5d3251d81f756b7dee16889d5f0b742/max_size/1000" width=600></img>  

### Add domain
Build → Authentication → Settings → Add domain  
domain: `chrome-extension://{Chrome Extension ID}`
<img src="https://user-images.githubusercontent.com/8764140/197352476-49f744dc-c85d-4d3a-adf8-a56fdc364527.png" width=600></img>  


## Setup Google Cloud Platform

#### Open [https://console.cloud.google.com/](https://console.cloud.google.com/)

#### Open API&Service → Credential → +CREATE CREDENTIALS →　OAuth Client ID

#### Select Chrome App, fill Name and Application ID (Chrome Extension ID)
<img src="https://gyazo.com/aabef1b96183786de8b3bcaec2b0fea3/max_size/1000" width=600></img>  

#### Edit `.env`.
Copy Your Client Id to `VUE_APP_OAUTH2_CLIENT_ID` 
<img src="https://user-images.githubusercontent.com/8764140/197352728-c2ebd1ca-af19-4a40-b0cf-e4f836eced69.png" width=600></img>  


#### Edit `rollup.config.js`.
Uncomment oauth2 settings.

```js
chromeExtension({
  extendManifest: {
    "oauth2": {
      "client_id": process.env.VITE_OAUTH2_CLIENT_ID,
      "scopes": [
        "https://www.googleapis.com/authuserinfo.email",
        "https://www.googleapis.com/authuserinfo.profile"
      ]
    },
    "key": process.env.VITE_MV3_KEY
  }
}),
```

## HMR
`npm run dev`

## Build
`npm run build`

