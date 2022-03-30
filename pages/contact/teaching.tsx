import { useMutation } from '@apollo/client';
import React, { useContext, useRef } from 'react'
import { Button } from '../../FrontEnd/components/Button';
import { useThemeContext } from '../../FrontEnd/Context/themeContext';
import { UserContext } from '../../FrontEnd/Context/userContext';
import { CREATE_Request } from '../../FrontEnd/graphql/mutations';
import useIsAuth from '../../FrontEnd/hooks/useIsAuth'
import Swal from 'sweetalert2';
const TeachingRequest = () => {
  useIsAuth();
  const {darkTheme} = useThemeContext();
  const {user} = useContext(UserContext);
  const message = useRef<HTMLTextAreaElement>(null!);

  const [createRequest] = useMutation(CREATE_Request, {
    onCompleted: () =>{
      Swal.fire("", 'تمّ ارسال طلبك ، سيتم مناقشة ملفّك في أقرب وقت ، سنتواصل معك عن طريق الهاتف او الايميل ', 'success')
    },
    onError: () =>{
      Swal.fire("", 'عذرا لقد حدث خطأ ، أعد المحاولة بعد قليل', 'error')
    }
  });

  const uploadFile = ( Imagefile: File | null | undefined, type?: string  ): void=>{
    const reader = new FileReader();
    const file: any = Imagefile;
    reader.readAsDataURL(file)
    reader.onloadend = () =>{
        createRequest({
          variables:{
            userID: user.info?._id,
            message: message.current.value,
            cv: reader.result
          }
        })
    }
  }
  return (
    <div className='text-darkColor dark:text-lightColor text-xl flex flex-col gap-10  w-2/3 m-auto mt-8'>
      <h1 className='text-5xl'>تقديم طلب للانظمام كمعلّم قرآن</h1>
      <form >
        <textarea name="message" id="message" cols={60} rows={10}
          className="p-5 rounded-3xl border border-darkColor dark:border-lightColor focus-within:border-2 bg-transparent mb-8 w-full" ref={message} placeholder='أكتب رسالة تتحدّث فيها عن سيرتك...'
        ></textarea>
        <input type='file' className='file:w-64 file:transparent file:p-4  file:bg-darkColor dark:file:bg-lightColor dark:file:text-darkColor file:text-lightColor file:cursor-pointer file:rounded-lg ' name='CVFile' 
        />

        <Button
          color={darkTheme ? "var(--light-color)" : `var(--main-color)`}
          txtColor={darkTheme ? `var(--main-color)` : "var(--light-color)"}
          text="انظمّ الى البرنامج"
          size="1.4rem"
          dir="ltr"
          onClick={(e:ClickEvent)=>{
            e.preventDefault(); 
            console.log(e.target.form)
            uploadFile(e.target?.form.CVFile.files?.item(0), e.target?.form.CVFile.files?.item(0)?.type)
          }}
          block
        />
      </form>
    </div>
  )
}
interface ClickEvent extends Event{
  target: ClickEventTarget
}
interface ClickEventTarget extends EventTarget {
  form: HTMLFormElement
  CVFile: HTMLInputElement
}

export default TeachingRequest