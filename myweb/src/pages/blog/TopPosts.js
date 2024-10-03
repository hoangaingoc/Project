import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import formatDate from "../../components/utils/FormatDate";
import useFilter from "./Filter"; // Import bộ lọc từ Filter.js

export default function TopPosts() {
    const { applyFilters } = useFilter(); // Sử dụng applyFilters từ Filter.js
    const [likes, setLikes] = useState([]);

    // Lấy danh sách lượt thích
    const getLikes = async () => {
        try {
            const res = await axios.get("http://localhost:3000/likes");
            setLikes(res.data);
        } catch (error) {
            console.error("Failed to fetch likes:", error);
        }
    };

    useEffect(() => {
        getLikes();
    }, []);

    // Tính toán số lượt thích cho mỗi bài viết
    const calculateLikes = (postId) => {
        return likes.filter(like => like.idPost === postId).length;
    };

    // Lấy các bài viết đã lọc từ applyFilters và tính toán số lượt thích
    const filteredPosts = applyFilters().map((post) => {
        const likeCount = calculateLikes(post.id);
        return { ...post, likeCount: likeCount || 0 }; // Thêm số lượt thích vào bài viết
    });

    // Sắp xếp theo số lượt thích giảm dần và chỉ lấy 3 bài viết có nhiều lượt thích nhất
    const topPosts = filteredPosts
        .sort((a, b) => b.likeCount - a.likeCount) // Sắp xếp theo lượt thích giảm dần
        .slice(0, 5); // Lấy 3 bài viết đầu tiên

    return (
        <div className="col-3 mt-5 ml-5">
            <h4 style={{textAlign:"center"}}>Bài viết nhiều lượt thích</h4>
            {topPosts.map((post) => (
                <Link to={'/home/detail/' + post.id} style={{textDecoration: "none"}} key={post.id}>
                    <div className="mb-3">
                        <li className="card-title">{post.title}</li>
                        <img src={post.imgPost} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text"><small className="text-muted">{formatDate(post.createAt)}</small></p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
