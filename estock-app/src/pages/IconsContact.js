import React from 'react';
import {BsTelephoneForward, BsWhatsapp} from "react-icons/bs";
import {BiCurrentLocation} from "react-icons/bi";
import {HiOutlineMail} from "react-icons/hi";

class IconsContact extends React.Component
{
    render() {
        return (
            <header className="header">
                <ul className="header-link">
                    <li>
                        <a href="/support/account">
                            <BsTelephoneForward className="icon-contact"/>
                        </a>
                    </li>
                    <li>
                        <a href="/support/account">
                            <BsWhatsapp className="icon-contact"/>
                        </a>
                    </li>
                    <li>
                        <a href="/support/account">
                            <BiCurrentLocation className="icon-contact"/>
                        </a>
                    </li>
                    <li>
                        <a href="/support/account">
                            <HiOutlineMail className="icon-contact"/>
                        </a>
                    </li>

                </ul>
            </header>
        );
    }
}

export default IconsContact;