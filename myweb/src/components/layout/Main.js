import React from "react";
import ListBlog from "../../pages/blog/ListBlog";
import FeaturedBlog from "../../pages/blog/FeaturedBlog";
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";
import TopPosts from "../../pages/blog/TopPosts";

export default function Main() {

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <FeaturedBlog/>
                        <div className="row">
                            <ListBlog/>
                        </div>
                    </div>
                    <Sidebar/>

                </div>
            </div>
        </>
    )
}
