// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor, EditorConfig } from '@ckeditor/ckeditor5-react';
// import CustomCKEditor from 'ckeditor5-custom-build/build/ckeditor';
import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

interface EditorpagePageProps {}

export default function EditorpagePage({}: EditorpagePageProps) {
  const router = useRouter();
  const [data, setData] = useState('<p>Hello from CKEditor 5!</p>');

  return (
    <Container>
      <Box>{/* <BaseEditor isLoading={true} /> */}</Box>
    </Container>
  );
}

// import styles from './CKEditor.module.css';

// EditorConfig
const editorConfiguration: any = {
  toolbar: [
    'heading',
    '|',
    'fontSize',
    'fontColor',
    'fontFamily',
    'fontBackgroundColor',
    'bold',
    'italic',
    'underline',
    'highlight',
    '|',
    'link',
    'horizontalLine',
    'bulletedList',
    'numberedList',
    'blockQuote',
    '|',
    'alignment',
    'outdent',
    'indent',
    '|',
    'insertTable',
    'imageInsert',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ],
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
      'toggleTableCaption',
    ],
  },
  image: {
    styles: {
      options: [
        {
          name: 'inline',
          title: 'Inline image',
        },
        {
          name: 'alignLeft',
          title: 'Left aligned Image',
          className: 'image-style-align-left',
          modelElements: ['imageInline'],
        },
        {
          name: 'alignRight',
          title: 'Right aligned Image',
          className: 'image-style-align-right',
          modelElements: ['imageInline'],
        },
        {
          name: 'alignBlockLeft',
          title: 'Left aligned Image',
          className: 'image-style-block-align-left',
          modelElements: ['imageBlock'],
        },
        {
          name: 'alignBlockRight',
          title: 'Right aligned Image',
          className: 'image-style-block-align-right',
          modelElements: ['imageBlock'],
        },
        {
          name: 'block',
          title: 'Block Image',
          modelElements: ['imageBlock'],
        },
      ],
    },
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        icon: 'original',
      },
      {
        name: 'resizeImage:25',
        value: '25',
        icon: 'small',
      },
      {
        name: 'resizeImage:50',
        value: '50',
        icon: 'medium',
      },
      {
        name: 'resizeImage:75',
        value: '75',
        icon: 'large',
      },
      // {
      //   name: 'resizeImage:100',
      //   value: '100',
      //   icon: 'max',
      // },
    ],
    toolbar: [
      'imageStyle:inline',
      // {
      //   name: 'imageStyle:icons',
      //   title: 'Warp Text',
      //   items: ['imageStyle:alignLeft', 'imageStyle:alignRight'],
      //   defaultItem: 'imageStyle:alignLeft',
      // },
      // {
      //   name: 'imageStyle:pictures',
      //   title: 'Break Text',
      //   items: ['imageStyle:alignBlockLeft', 'imageStyle:block', 'imageStyle:alignBlockRight'],
      //   defaultItem: 'imageStyle:block',
      // },
      '|',
      'resizeImage',
      'imageTextAlternative',
    ],
  },
};

type Props = {
  initialHTML: {
    author: string;
    title: string;
    description: string;
    content: string;
  };
  hash: string;
};
export const CKEditorComponent = (
  { initialHTML, hash }: Props = {
    initialHTML: {
      author: '',
      title: '',
      description: '',
      content: '',
    },
    hash: '',
  }
) => {
  const { author, title, description, content } = initialHTML;
  const [editingContent, setEditingContent] = useState(content || '<p>글을 씁시다</p>');
  const [metadata, setMetadata] = useState({
    author: author,
    title: title || '',
    description: description || '',
  });
  const [saved, setSaved] = useState(false);
  const autosaveInterval = 3000;
  const [warning, setWarning] = useState('');

  const saveData = useCallback(async () => {
    try {
      const content = editingContent;
      const { author, title, description } = metadata;
      // const res = await ContentAPI.updatePosts({ hash, author, title, description, content });
      // if (res.status === 200) {
      //   setSaved(true);
      // }
    } catch (err) {
      console.error(err);
    }
  }, [editingContent, metadata]);

  // handle meta data change
  const handleMetadataChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const { name, value } = ev.target;
    setMetadata((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  // handle text editor input change
  const handleEditorChange = (event: any, editor: any) => {
    setEditingContent(editor.getData());
    setSaved(false);
  };

  // Autosave timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      // API call
      const { author, title, description } = metadata;
      if (title.length > 0 && description.length > 0 && author.length > 0) {
        saveData();
      } else {
        setWarning('제목 글쓴이 요약을 작성해주세요');
      }
    }, autosaveInterval);
    return () => {
      return clearTimeout(timer);
    };
  }, [metadata, saveData]);

  // 상태 메세지
  useEffect(() => {
    const warningMessage = () => {
      const { author, title, description } = metadata;
      if (title.length > 0 || description.length > 0 || author.length > 0) {
        setWarning('제목 글쓴이 요약을 작성해주세요');
      }
      if (!saved) {
        setWarning('저장 중입니다');
      } else {
        setWarning('저장되었습니다');
      }
    };
    warningMessage();
  }, [saved, metadata]);

  return (
    <>
      {/* Meta data fields */}
      <div>
        <label>제목</label>
        <input
          name='title'
          value={metadata.title || ''}
          autoComplete='off'
          onChange={handleMetadataChange}
          placeholder='제목을 입력하세요'
        />
        <label>글쓴이</label>
        <input
          name='author'
          value={metadata.author || ''}
          autoComplete='off'
          onChange={handleMetadataChange}
          placeholder='글쓴이를 입력하세요'
        />
        <label>요약</label>
        <input
          name='description'
          value={metadata.description || ''}
          autoComplete='off'
          onChange={handleMetadataChange}
          placeholder='요약을 입력하세요'
        />
      </div>
      <div>
        {/* <CKEditor
          editor={ClassicEditor}
          // editor={CustomCKEditor as typeof ClassicEditor}
          // config={editorConfiguration}
          // data={content || '<p>글을 씁시다</p>'}
          // onChange={handleEditorChange}
        /> */}
        {saved ? <div>{warning}</div> : <div>{warning}</div>}
      </div>
      {/* <style jsx global>{`
        .ck-editor__editable {
          min-height: 25vh;
        }
        .ck-editor__nested-editable {
          min-height: 2rem; 
        }
      `}</style> */}
    </>
  );
};
