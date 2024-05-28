import { WalletMethods } from './walletMethods/waletMethod'

const walletMethods = new WalletMethods()
const walletAddress = document.querySelector<HTMLSpanElement>("#walletAddress")

const tableUser = document.querySelector("#tableUser")
const tableShuffle = document.querySelector("#tableShuffle")
const shuffleButton = document.querySelector<HTMLButtonElement>("#shuffleButton")
const resetButton = document.querySelector<HTMLButtonElement>("#resetButton")
const tableClass = document.querySelector("#tableClass")



resetButton?.addEventListener('click', async () => {
  await walletMethods.resetStudent()
  if (tableShuffle) {
    tableShuffle.innerHTML = ""
  }
})

shuffleButton?.addEventListener('click', async () => {
  const getAllClasses: any = await walletMethods.getAllClasses()
  await walletMethods.assignStudentsToClasses().catch(async () => {
    if (tableShuffle) {
      tableShuffle.innerHTML = ""
    }
    //await walletMethods.resetStudent()
  })

  getAllClasses.forEach((classes: any) => {
    classes.students.forEach((student: any) => {
      const tr = document.createElement('tr');

      const tdClassName = document.createElement('td');
      tdClassName.innerText = classes.className;
      tr.appendChild(tdClassName);

      const tdName = document.createElement('td');
      tdName.innerText = classes.name;
      tr.appendChild(tdName);

      const tdDate = document.createElement('td');
      tdDate.innerText = classes.date;
      tr.appendChild(tdDate);

      const tdHour = document.createElement('td');
      tdHour.innerText = classes.hour;
      tr.appendChild(tdHour);

      const tdStudentName = document.createElement('td');
      tdStudentName.innerText = student.name;
      tr.appendChild(tdStudentName);


      const tdStudentSurname = document.createElement('td')
      tdStudentSurname.innerText = student.surname;
      tr.appendChild(tdStudentSurname)

      const tdStudentNo = document.createElement('td')
      tdStudentNo.innerText = student.schoolNo;
      tr.appendChild(tdStudentNo)

      const tdCapacity = document.createElement('td');
      tdCapacity.innerText = classes.chairNumber.toString();
      tr.appendChild(tdCapacity);

      tableShuffle?.appendChild(tr);
    });

    if (classes.students.length === 0) {
      const tr = document.createElement('tr');

      const tdClassName = document.createElement('td');
      tdClassName.innerText = classes.className;
      tr.appendChild(tdClassName);

      const tdName = document.createElement('td');
      tdName.innerText = classes.name;
      tr.appendChild(tdName);

      const tdDate = document.createElement('td');
      tdDate.innerText = classes.date;
      tr.appendChild(tdDate);

      const tdHour = document.createElement('td');
      tdHour.innerText = classes.hour;
      tr.appendChild(tdHour);

      const tdStudentName = document.createElement('td');
      tdStudentName.innerText = "No students";
      tr.appendChild(tdStudentName);

      const tdStudentSurname = document.createElement('td');
      tdStudentSurname.innerText = "No students";
      tr.appendChild(tdStudentSurname);

      const tdStudentNo = document.createElement('td');
      tdStudentNo.innerText = "No students";
      tr.appendChild(tdStudentNo);

      const tdCapacity = document.createElement('td');
      tdCapacity.innerText = classes.chairNumber.toString();
      tr.appendChild(tdCapacity);

      tableShuffle?.appendChild(tr);
    }
  });

  console.log(getAllClasses);
})


window.addEventListener('load', async () => {
  const userSignAddress: any = await walletMethods.getSign()
  if (walletAddress) {
    walletAddress.innerText = userSignAddress
  }

  const getAllStudents: any = await walletMethods.getAllStudent()
  const getAllClasses: any = await walletMethods.getAllClasses()

  getAllStudents.forEach((user: any) => {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')

    tdName.innerText = user.name;
    tr.appendChild(tdName)

    const tdSurname = document.createElement('td')
    tdSurname.innerText = user.surname;
    tr.appendChild(tdSurname)

    const tdNo = document.createElement('td')
    tdNo.innerText = user.schoolNo
    tr.appendChild(tdNo)

    tableUser?.appendChild(tr)
  });

  getAllClasses.forEach((classes: any) => {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')

    tdName.innerText = classes.name;
    tr.appendChild(tdName)

    const tdClassName = document.createElement('td')
    tdClassName.innerText = classes.className;
    tr.appendChild(tdClassName)

    const tdChairNumber = document.createElement('td')
    tdChairNumber.innerText = classes.chairNumber
    tr.appendChild(tdChairNumber)

    tableClass?.appendChild(tr)
  });

})




