import axios from 'axios';
import { useState, useEffect } from 'react';

const Image = () => {
	const [data, setData] = useState([]);

	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		setFile(event.target.files);
		console.log(file);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData();
		data.append('file', file[0]);
		console.log(data);
		axios.post('http://localhost:4001/upload', data).then((res) => {
			console.log(res.statusText);
		});

    // axios.post('http://localhost:4001/upload2', data).then((res) => {
	// 		console.log(res.statusText);
	// 	});
	};

	useEffect(() => {
		axios
			.get('http://localhost:4001/getImg')
			.then((res) => setData(res.data))
			.catch((err) => console.log(err, 'it has an error'));
			console.log(data)
			
	},[]);
	return (
		<div>
			<div>
				<h1>Image uploading react</h1>
			</div>
			<div>
				<form>
					<div className='form-group'>
						<label htmlFor='file'>Upload File:</label>
						<input
							className='form-control-file mb-3'
							type='file'
							id='file'
							accept='.png'
							multiple
							onChange={handleFileChange}
						/>

						<button className='btn btn-primary mt-3' onClick={handleSubmit}>
							Upload
						</button>
					</div>
				</form>

				{/* Display Image Here */}
			</div>
			<div>
				{data.map((singleData) => {
					const base64String = btoa(
						new Uint8Array(singleData.img.data.data).reduce(function (
							data,
							byte
						) {
							return data + String.fromCharCode(byte);
						},
						'')
					);
					return (
					   <img src={`data:image/png;base64,${base64String}`} width='1000' />
					);
				})}
			</div>
		</div>
	);
};

export default Image;
