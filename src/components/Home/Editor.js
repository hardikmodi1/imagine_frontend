import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

class Editor extends Component {

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
        body = body.replace('<img','<img className="editorImg"')
        await confirmAlert({
            title: 'Confirm before submitting!',
            message: 'Are you sure to publish this answer.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {this.props.submit(body);this.setState({
                        body: ''
                    })}
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        })
        // this.props.submit(this.state.body);
        
    }

    render() {
        return (
            <div className="editorCont">
                <ReactQuill
                    className="editorClass"
                    modules={Editor.modules}
                    formats={Editor.formats}
                    value={this.state.body}
                    placeholder="Type your answer"
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

Editor.modules = {
    toolbar: [
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']
    ]
  };
  
  Editor.formats = [
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

export default Editor;