import { WebviewWindow } from '@tauri-apps/api/window';
import { WalletMethods } from './walletMethods/waletMethod'
import { disconnect } from '@wagmi/core';
import { wagmiConfig } from './config';

const walletMethods = new WalletMethods()

const walletAddress = document.querySelector<HTMLSpanElement>("#walletAddress");

const classMenuButton = document.querySelector<HTMLButtonElement>("#class");

const exitButton = document.querySelector<HTMLButtonElement>("#exit")

classMenuButton?.addEventListener('click', async () => {
  await WebviewWindow.getByLabel('studentList')?.show()
  //await WebviewWindow.getByLabel('menu')?.hide()
})

exitButton?.addEventListener('click',async () => {
   disconnect(wagmiConfig)
   localStorage.clear()
  await WebviewWindow.getByLabel('main')?.show()
  await WebviewWindow.getByLabel('studentMenu')?.hide()
})


window.addEventListener('load', async () => {
  const userSignAddress: any = await walletMethods.getSign()
  if (walletAddress) {
    walletAddress.innerText = userSignAddress
  }
})

