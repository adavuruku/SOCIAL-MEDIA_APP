
import React, {Component} from 'react';
import ReactQuill, { Quill } from "react-quill";
import axios from 'axios';
import loader from './loader.gif';

import '../node_modules/react-quill/dist/quill.snow.css';



class MyComponent extends React.Component {
    state = { editorHtml: '' };
    constructor(props) {
        super(props);
        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component
        this.handleChange = this.handleChange.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
        this.apiPostNewsImage = this.apiPostNewsImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    } 

    componentDidMount() {
        this.attachQuillRefs()
    }
      
    componentDidUpdate() {
        this.attachQuillRefs()
    }
    
    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    
    handleChange(html) {
        // console.log(this.quillRef)
        this.setState({ editorHtml: html });
    }

    onSubmit (e) {
        e.preventDefault();
        //retrieve all the images in 
        // in array of urls
        var m,
        urls = [], 
        // <img[^>]+src="?([^"\s]+)"?[^>]*\/>/g
        // <img.*?src="([^">]*\/([^">]*?))".*?>/g
        str = this.state.editorHtml,
        rex = /<img[^>]+src="?([^"\s]+)"?\s*\>/g;
        while (m = rex.exec(str)) {
            urls.push(m[1]);
        }
        console.log('submitted >>> ', urls)
      };

    async apiPostNewsImage(formData) {
        let upload = await axios.post("http://localhost:3000/api/user/testimage", formData);

         return upload.data.url
    }

    imageHandler() {
        const input = document.createElement('input');
        
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
    
        input.onchange = async () => {
            const file = input.files[0];
            console.log('>> : ',file)
            const formData = new FormData();
            
            formData.append(
                "ImageFile",
                file,
                file.name
            );
            // // Save current cursor state
            const range = this.quillRef.getSelection(true);
    
            // // Insert temporary loading placeholder image
            this.quillRef.insertEmbed(range.index, 'image', loader);
    
            // // Move cursor to right side of image (easier to continue typing)]
            this.quillRef.setSelection(range.index + 1);
    
            // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
            const res = await this.apiPostNewsImage(formData); 
    
            // // // Remove placeholder image
            this.quillRef.deleteText(range.index, 1);

            this.quillRef.insertEmbed(range.index, 'image', res);
        };
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>

           
            <div className="text-editor">
                {/* {JSON.stringify(this.state.editorHtml)} */}
                <hr />
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    modules={{
                        toolbar: {
                            container: [
                                [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: []}],
                                [{ size: [] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                                [{ list: 'ordered' }, { list: 'bullet' },
                                {'indent': '-1'}, {'indent': '+1'}],
                                
                                // ['link', 'image', 'video'],
                                ['link', 'image'],
                                ['clean'],
                                ['code-block']
                            ],
                            clipboard: {
                                // toggle to add extra line breaks when pasting HTML:
                                matchVisual: false,
                              },
                            handlers: {
                                image: this.imageHandler
                            }
                        }
                    }}
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
            </form>
        );
    }
}

export default MyComponent;