import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    Alignment,
    Autoformat,
    AutoImage,
    BlockQuote,
    Bold,
    ClassicEditor,
    CodeBlock,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Heading,
    Highlight,
    HorizontalLine,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    MediaEmbed,
    PageBreak,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersEssentials,
    Strikethrough,
    Table,
    TableCellProperties,
    TableProperties,
    TableToolbar,
    Underline,
    WordCount
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5/translations/fa.umd';


export default function CkEditor() {
    // const uploadMutation = useMutation({
    //     mutationFn: async (file) => {
    //         const data = new FormData();
    //         data.append("file", file);
    //
    //         const res = await axios.post("/manager/image-uploader", data, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });
    //
    //         return res.data;
    //     },
    //     onError: (error) => {
    //         Toast({ icon: "error", message: "آپلود تصویر با خطا مواجه شد!" });
    //         console.error(error);
    //     }
    // });
    //
    // function MyCustomUploadAdapterPlugin(editor) {
    //     editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    //         return new MyUploadAdapter(loader, uploadMutation);
    //     };
    // }
    //
    // class MyUploadAdapter {
    //     constructor(loader, mutation) {
    //         this.loader = loader;
    //         this.mutation = mutation;
    //     }
    //
    //     async upload() {
    //         const file = await this.loader.file;
    //         try {
    //             const data = await this.mutation.mutateAsync(file);
    //             return {
    //                 default: data.url // باید از سرورت url فایل آپلود شده رو بگیره
    //             };
    //         } catch (err) {
    //             throw err;
    //         }
    //     }
    //
    //     abort() {
    //         // می‌تونی اینجا mutation.cancel بزنی اگه لازم شد
    //     }
    // }


    return (
        <div className={`my-2`}>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    licenseKey: 'GPL',
                    language: {
                        ui: 'fa',
                        content: 'fa',
                    },
                    // extraPlugins: [ MyCustomUploadAdapterPlugin ],
                    plugins: [
                        Essentials, Paragraph, Heading, SelectAll,
                        Bold, Italic, Underline, Strikethrough,
                        BlockQuote, CodeBlock, RemoveFormat, Autoformat,
                        FontFamily, FontSize, FontColor, FontBackgroundColor, Highlight,
                        List, ListProperties, Indent, IndentBlock,
                        Link,
                        Image, ImageToolbar, ImageCaption, ImageStyle,
                        ImageResize, ImageUpload, AutoImage,
                        Table, TableToolbar, TableProperties, TableCellProperties,
                        MediaEmbed,
                        HorizontalLine, PageBreak, SpecialCharacters, SpecialCharactersEssentials,
                        FindAndReplace, WordCount, PasteFromOffice,
                        Alignment, ShowBlocks, SourceEditing
                    ],
                    toolbar: [
                        'undo', 'redo', '|',
                        'heading', '|',
                        'bold', 'italic', 'underline', 'strikethrough', '|',
                        'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|',
                        'alignment', '|',
                        'link', 'blockQuote', 'codeBlock', '|',
                        'bulletedList', 'numberedList', 'outdent', 'indent', '|',
                        'insertTable', 'mediaEmbed', 'imageUpload', '|',
                        'horizontalLine', 'pageBreak', '|',
                        'specialCharacters', 'findAndReplace', 'showBlocks', '|',
                        'selectAll', 'removeFormat', '|',
                        'wordCount', '|', 'sourceEditing'
                    ],
                }}
            />
        </div>
    );
}
