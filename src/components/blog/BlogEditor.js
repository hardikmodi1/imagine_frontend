import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

class BlogEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            body: '',
        };
    }

    onHandleChange(e) {
        this.setState({ body: e });
    }

    async submit() {
        var body = this.state.body;
        body = body.replace("<img","<img className='blogImg'")
        await confirmAlert({
            title: 'Confirm before submitting!',
            message: 'Are you sure to publish this blog.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const status = this.props.submit(body);
                        if(status)
                            this.setState({
                                body: ''
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        })
        
    }

    render() {
        return (
            <div className="editorCont">
                <ReactQuill
                    modules={BlogEditor.modules}
                    formats={BlogEditor.formats}
                    value={this.state.body}
                    placeholder="Body"
                    onChange={this.onHandleChange.bind(this)}
                />
                <button className="btn btn-primary askBtn1" onClick={this.submit.bind(this)}>Submit</button>
            </div>
        )
    }
}

const Font = ReactQuill.Quill.import('formats/font'); // <<<< ReactQuill exports it
Font.whitelist = ['Roboto'] ; // allow ONLY these fonts and the default
ReactQuill.Quill.register(Font, true);

BlogEditor.modules = {
    toolbar: [
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']
    ]
  };
  
  BlogEditor.formats = [
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
  ];

export default BlogEditor;