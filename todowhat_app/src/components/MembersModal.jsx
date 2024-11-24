import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const MembersModal = ({ show, onClose, groupId }) => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState("");
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        // 确保在显示弹窗且有 groupId 的情况下才加载数据
        if (!show || !groupId) return; 

        const fetchMembers = async () => {
            try {
            const res = await fetch("/api/groups/${groupId}/members", {
                headers: {
                Authorization: "Bearer YOUR_TEST_TOKEN",
                },
            });

            const data = await res.json();

            if (res.ok) {
                setMembers(data.members);
            } else {
                throw new Error(data.error.message || "Failed to fetch members.");
            }
            } catch (err) {
            setError(err.message);
            }
        };

        fetchMembers();
    }, [show, groupId]);

    // Handle member removal
    const removeMember = async (userId) => {
        if (!groupId) return;
        setIsRemoving(true);

        try {
            const res = await fetch(`/api/groups/${groupId}/remove/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer YOUR_TEST_TOKEN",
            },
            });

            const data = await res.json();

            if (res.ok) {
                setMembers((prevMembers) => prevMembers.filter((member) => member.id !== userId));
            } else {
                throw new Error(data.error.message || "Failed to remove member.");
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setIsRemoving(false);
        }
    };

    // Determine badge color based on role
    const getRoleBadgeClass = (role) => {
        switch (role.toLowerCase()) {
        case "owner":
            return "bg-danger";
        case "admin":
            return "bg-primary";
        default:
            return "bg-secondary";
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Group Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                <Button className="btn btn-primary mb-3" 
                        onClick={() => console.log("Add Member")}>
                    Add Member
                </Button>
                <ul className="list-group">
                    {members.map((member) => (
                        <li
                        key={member.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        >
                        <span>
                            {member.name}{" "}
                            <span className={`badge ${getRoleBadgeClass(member.role)} ms-2`}>
                            {member.role}
                            </span>
                        </span>
                        <Button
                            variant="danger"
                            size="sm"
                            disabled={isRemoving}
                            onClick={() => removeMember(member.id)}
                        >
                            Remove
                        </Button>
                        </li>
                    ))}
                </ul>
            </>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    );
};

export default MembersModal;