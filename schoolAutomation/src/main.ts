
import { createWeb3Modal } from '@web3modal/wagmi'
import './style.css'
import { WebviewWindow } from '@tauri-apps/api/window'
import { disconnect, getAccount, watchAccount } from '@wagmi/core'
import { WalletMethods } from './walletMethods/waletMethod'
import { wagmiConfig, projectId } from './config'
const walletMethods = new WalletMethods()

const button = document.querySelector<HTMLButtonElement>('#connectWallet')

const handler = () => {
  console.log("Handler working...")
}
//await walletMethods.mockData()

const connect = () => {
  if (getAccount(wagmiConfig).isConnected) {
    disconnect(wagmiConfig)
  }
  else {
    modal.open()
  }
}

// @ts-ignore
var data: any;

const mainWindow = WebviewWindow.getByLabel('main')

const statusElement: any = document.getElementsByName('status')
let statusSelected: any;



watchAccount(wagmiConfig, {
  onChange(account) {
    if (account.isConnected) {
      data = account
      walletMethods.isUser(account.address as string, statusSelected).then((data: any) => {
        console.log(data)
        if (data[0] == false && statusSelected == 0) {
          walletMethods.postCahceUserAddress(account.address as string)
          const teacherSignUp = new WebviewWindow('teacherSignUp', {
            url: "../signUp/teacher/kayıt.html"
          })
          mainWindow?.hide()
          teacherSignUp.center()
        }
        else if (data[0] == false && statusSelected == 1) {
          walletMethods.postCahceUserAddress(account.address as string)
          const studentSignUp = new WebviewWindow('studentSignUp', {
            url: "../signUp/student/kayıt.html"
          })
          mainWindow?.hide()
          studentSignUp.center()
        }
        else {
          if (statusSelected == 0) {
            walletMethods.postSign(account.address as string, data[1] as number)
            const menu = WebviewWindow.getByLabel("menu")
            mainWindow?.hide()
            menu?.show()
          }
          else {
            walletMethods.postSign(account.address as string, data[1] as number)
            const menu = WebviewWindow.getByLabel("studentMenu")
            mainWindow?.hide()
            menu?.show()


          }
        }
      }).catch(err => console.log(err))
    }
    else {

    }
  }
})

const modal = createWeb3Modal({ wagmiConfig, projectId, themeMode: 'light' })
modal.subscribeWalletInfo(handler)
button?.addEventListener('click', async () => {
  for (let item of statusElement) {
    if (item.checked) {
      statusSelected = item.value
    }
  }
  connect()
})




