import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import NotFound from './componet/NotFound'
import { AuthProvider } from './context/AuthContext'
import About from './pages/About'
import Account_page from './pages/Account_page'
import All_category_view from './pages/All_category_view'
import Contact from './pages/Contact'
import Edit_profile from './pages/Edit_profile'
import Home_Page from './pages/Home_Page'
import Login_page from './pages/Login_page'
import One_Page_view from './pages/One_Page_view'
import Post_add_page_1 from './pages/Post_add_page_1'
import Post_add_page_2 from './pages/Post_add_page_2'
import Post_add_page_elecronic from './pages/Post_add_page_elecronic'
import Post_add_page_estate from './pages/Post_add_page_estate'
import Post_add_page_phone from './pages/Post_add_page_phone'
import Post_add_page_vehicles from './pages/Post_add_page_vehicles'
import Register_page from './pages/Register_page'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home_Page />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/all_category" element={<All_category_view />} />
            <Route path="/login" element={<Login_page />} />
            <Route path="/one_category_page/:id" element={<One_Page_view />} />
            <Route path="/post_add" element={<Post_add_page_1 />} />
            <Route path="/Post_add_details" element={<Post_add_page_2 />} />
            <Route path="/registration" element={<Register_page />} />
            <Route path="/account" element={<Account_page />} />
            <Route path="/edit_profile" element={<Edit_profile />} />
            
            {/* Category-specific post creation routes */}
            <Route path="/Post_add_vehicle" element={<Post_add_page_vehicles />} />
            <Route path="/Post_add_estate" element={<Post_add_page_estate />} />
            <Route path="/Post_add_phone" element={<Post_add_page_phone />} />
            <Route path="/Post_add_elecronic" element={<Post_add_page_elecronic />} />

            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App