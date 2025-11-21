import { FaAngleLeft } from "react-icons/fa6";
// import '../css/edit_profile.css';



export default function Edit_profile() {
    return (
        <div>
            <div className="navi_edit_profile">
                <a href="/account">
                    <div className="div_back">
                        <FaAngleLeft size={20} color='black' />
                        <span>Back to Account</span>
                    </div>
                </a>
                <h4>Edit Profile Details</h4>
            </div>
            <div className="edit_profile">
                <div className="profile_head">
                    <div className="user_profile">
                        <div className="image">
                            <img src="" alt="" />
                        </div>
                        <h3>{name}Thanura</h3>
                    </div>
                </div>
                <div className="edit_form">
                    <form action="">
                        <fieldset>
                            <legend>Personal Information</legend>
                            <div className="edit_from_heder">
                                <span>Personal Information</span>
                            </div>
                            <div className="edit_from_details">
                                <label htmlFor="">First Name</label><br />
                                    <input type="text" placeholder='First Name' /><br />
                                <label htmlFor="">Last Name</label><br />
                                    <input type="text" placeholder='Last Name' /><br />
                                <label htmlFor="">Old Password</label><br />
                                    <input type="password" placeholder='Old Password'/><br />
                                <label htmlFor="">New Password</label><br />
                                    <input type="password" placeholder='New Password'/><br />
                                <label htmlFor="">Conform Password</label><br />
                                    <input type="password" placeholder='Conform Password'/><br />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>User Picture</legend>
                            <div className="edit_from_heder">
                                <span>User Picture</span>
                            </div>
                            <div className="edit_from_iamge">
                                <label htmlFor="">Current Picture</label><br />
                                    <a href="">
                                        <div className="image_edit_profile">
                                            <img src="" alt="" />
                                        </div>
                                    </a><br />
                                <label htmlFor="">New Picture</label><br />
                                    <a href="">
                                        <div className="image_edit_profile">
                                            <input type="file" name="" id="" />
                                        </div>
                                    </a><br />
                            </div>
                        </fieldset>
                        <div className="edit_form_button">
                            <input type="submit" value="Cancel" className='btn btn-secondary'/>
                            <input type="submit" value="Update Profile" className='btn btn-primary'/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
