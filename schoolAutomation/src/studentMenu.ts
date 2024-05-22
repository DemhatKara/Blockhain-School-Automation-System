import { WebviewWindow } from '@tauri-apps/api/window';
import { WalletMethods } from './walletMethods/waletMethod'

const walletMethods = new WalletMethods()

const walletAddress = document.querySelector<HTMLSpanElement>("#walletAddress");

const classMenuButton = document.querySelector<HTMLButtonElement>("#class");


classMenuButton?.addEventListener('click', async () => {
  await WebviewWindow.getByLabel('studentList')?.show()
  //await WebviewWindow.getByLabel('menu')?.hide()
})



window.addEventListener('load', async () => {
  const userSignAddress: any = await walletMethods.getSign()
  if (walletAddress) {
    walletAddress.innerText = userSignAddress
  }
})

