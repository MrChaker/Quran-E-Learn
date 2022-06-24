import { useMutation } from '@apollo/client';
import { useRef } from 'react';
import { Button } from '../../FrontEnd/components/general/Button';
import { useThemeContext } from '../../FrontEnd/Context/themeContext';
import { CREATE_Request } from '../../FrontEnd/graphql/mutations';
import Swal from 'sweetalert2';
import FileInput from '../../FrontEnd/components/general/input';
import { GetServerSidePropsContext } from 'next';
import { getUserProps } from '../../FrontEnd/getUserProps';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await getUserProps(context.req.headers.cookie, false, true);
}

const TeachingRequest = ({ ...props }) => {
  const { darkTheme } = useThemeContext();
  const message = useRef<HTMLTextAreaElement>(null!);

  const [createRequest] = useMutation(CREATE_Request, {
    onCompleted: () => {
      Swal.fire(
        '',
        'تمّ ارسال طلبك ، سيتم مناقشة ملفّك في أقرب وقت ، سنتواصل معك عن طريق الهاتف او الايميل ',
        'success'
      );
    },
    onError: () => {
      Swal.fire('', 'عذرا لقد حدث خطأ ، أعد المحاولة بعد قليل', 'error');
    },
  });
  const uploadFile = (Imagefile: File | null | undefined): void => {
    const reader = new FileReader();
    const file: any = Imagefile;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      createRequest({
        variables: {
          userID: props.user._id,
          message: message.current.value,
          cv: reader.result,
        },
      });
    };
  };

  return (
    <div className="text-darkColor dark:text-lightColor text-xl flex flex-col gap-10  w-2/3 m-auto mt-8">
      <h1 className="text-5xl">تقديم طلب للانظمام كمعلّم قرآن</h1>
      <form>
        <textarea
          name="message"
          id="message"
          cols={60}
          rows={10}
          className="p-5 rounded-3xl border border-darkColor dark:border-lightColor focus-within:border-2 bg-transparent mb-8 w-full"
          ref={message}
          placeholder="أكتب رسالة تتحدّث فيها عن سيرتك..."
        ></textarea>

        <FileInput text={` ارفق ملف pdf او صورة للاجازة`} name="CVFile" />

        <Button
          color={darkTheme ? 'var(--light-color)' : `var(--main-color)`}
          txtColor={darkTheme ? `var(--main-color)` : 'var(--light-color)'}
          text="تقديم الطلب"
          size="1.4rem"
          dir="ltr"
          onClick={(e: ClickEvent) => {
            e.preventDefault();
            uploadFile(e.target?.form.CVFile.files?.item(0));
          }}
          block
        />
      </form>
    </div>
  );
};
interface ClickEvent extends Event {
  target: ClickEventTarget;
}
interface ClickEventTarget extends EventTarget {
  form: HTMLFormElement;
  CVFile: HTMLInputElement;
}

export default TeachingRequest;
