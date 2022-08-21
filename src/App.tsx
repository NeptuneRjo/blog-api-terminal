import React, { useEffect, useState } from 'react'
import { Navbar } from './components/components-exports'
import {
	Dashboard,
	Blog,
	Login,
	Signup,
	CreateBlog,
} from './pages/pages-exports'
import { Route, Routes } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { BlogInt, CleanUserInt } from './types'
import { fetchAllBlogs, fetchUser } from './API/api-exports'

import 'bootswatch/dist/morph/bootstrap.min.css'
import './App.css'

const App: React.FC = () => {
	const [blogs, setBlogs] = useState<BlogInt[] | []>([])
	const [user, setUser] = useState<CleanUserInt | undefined>(undefined)

	const [blogError, setBlogError] = useState<unknown | null>(null)
	const [userError, setUserError] = useState<unknown | null>(null)

	useEffect(() => {
		;(async function setStateToReturnedBlogs() {
			try {
				const fetchedBlogs = await fetchAllBlogs()
				setBlogs(fetchedBlogs)
			} catch (err) {
				setBlogError(err)
			}
		})()
		const sessionUser = sessionStorage.getItem('user')

		if (sessionUser !== 'undefined') {
			setUser(JSON.parse(`${sessionUser}`))
		}
	}, [])

	return (
		<HashRouter>
			<div className='app-main'>
				<Navbar user={user} setUser={setUser} />
				<Routes>
					<Route
						path='/blog/:id'
						element={<Blog user={user} setBlogs={setBlogs} />}
					/>
					<Route
						path='/create-blog'
						element={<CreateBlog user={user} setBlogs={setBlogs} />}
					/>
					<Route
						path='/login'
						element={<Login user={user} setUser={setUser} />}
					/>
					<Route
						path='/signup'
						element={<Signup user={user} setUser={setUser} />}
					/>
					<Route path='/' element={<Dashboard blogs={blogs} />} />
				</Routes>
			</div>
		</HashRouter>
	)
}

export default App
