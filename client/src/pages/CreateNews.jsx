import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const CreateNews = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrls, setImageUrls] = useState([]); // State to store image URLs

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newsData = {
            title,
            content,
            images: imageUrls, // Pass the image URLs to backend
        };
        try {
            const response = await axios.post('http://localhost:3001/news/upload-news', newsData);
            if (response.status === 200) {
                console.log('News saved:', response.data);
            } else {
                console.log('Error saving news:');
            }
        } catch (error) {
            // console.log(error);
        }
    };

    // Function to handle image upload response
    const handleImageUploadResponse = (response) => {
        if (response.data.uploaded) {
            setImageUrls((prevUrls) => [...prevUrls, response.data.url]);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        className="w-full text-2xl p-4 outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Tiêu đề"
                        required
                    />
                </div>
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        config={{
                            ckfinder: {
                                uploadUrl: 'http://localhost:3001/news/upload-image',
                            },
                            toolbar: [
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                                'blockQuote',
                                'imageUpload',
                                '|',
                                'undo',
                                'redo',
                            ],
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                        onReady={(editor) => {
                            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                                return {
                                    upload: () => {
                                        return loader.file.then((file) => {
                                            const formData = new FormData();
                                            formData.append('upload', file);

                                            return axios
                                                .post('http://localhost:3001/news/upload-image', formData, {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data',
                                                    },
                                                })
                                                .then((response) => {
                                                    handleImageUploadResponse(response);
                                                    return {
                                                        default: response.data.url,
                                                    };
                                                })
                                                .catch((error) => {
                                                    console.error(error);
                                                    throw error;
                                                });
                                        });
                                    },
                                };
                            };
                        }}
                    />
                </div>

                <div className="w-full flex items-center justify-end">
                    <button
                        type="button"
                        className="mt-4 outline-none mr-10 text-xl text-right hover:bg-gray-300 rounded-lg py-4 px-6 bg-gray-200"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="mt-4 outline-none mr-10 text-xl text-white text-right hover:bg-[#1c5291] rounded-lg p-4 bg-[#386fd6]"
                    >
                        Đăng bài
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNews;
