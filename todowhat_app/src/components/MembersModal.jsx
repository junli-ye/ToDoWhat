import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const MembersModal = ({ show, onClose, groupId }) => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState("");
    const [isRemoving, setIsRemoving] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false); // Show Add Member Modal
    const [email, setEmail] = useState("");
    const [addMemberError, setAddMemberError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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
    const removeMember = async (userId, role) => {
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
                alert("Member removed successfully.");
            } else {
                throw new Error(data.error.message || "Failed to remove member.");
            }
        } catch (err) {
            if (role === "owner") {
                alert("Cannot remove the owner of the group.");
              } else {
                alert(err.message);
              }
        } finally {
            setIsRemoving(false);
        }
    };

    // Handle Add Member Modal
    const addMember = async () => {
        setAddMemberError("");
        setSuccessMessage("");
    
        try {
          const res = await fetch(`/api/groups/${groupId}/invite`, {
            method: "POST",
            headers: {
              Authorization: "Bearer YOUR_TEST_TOKEN",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            setSuccessMessage("User invited successfully!");
            setMembers((prevMembers) => [
              ...prevMembers,
              { id: data.member.userId, name: email, role: data.member.role },
            ]);
            setEmail("");
            setShowAddMemberModal(false);
          } else {
            switch (data.error.code) {
              case "USER_NOT_FOUND":
                setAddMemberError(
                  "The user has not yet activated ToDoWhat. We’ve sent an invitation email. Once registered, they will see their tasks."
                );
                break;
              case "ALREADY_MEMBER":
                setAddMemberError("This user is already a member of the group.");
                break;
              default:
                setAddMemberError(data.error.message || "Failed to invite member.");
                break;
            }
          }
        } catch (err) {
          setAddMemberError("An error occurred while inviting the member. Try again later.");
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
        <>
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Group Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
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
                            disabled={isRemoving || member.role === "Owner"}
                            onClick={() => removeMember(member.id, member.role)}
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
            <Button className="btn btn-primary" 
                    onClick={() => setShowAddMemberModal(true)}>
                Add Member
            </Button>
            <Button variant="secondary" onClick={onClose}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>

        {/* Add Member Modal */}
        <Modal show={showAddMemberModal} onHide={() => setShowAddMemberModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="addMemberEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter user's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            </Form>
            {addMemberError && <Alert variant="danger" className="mt-3">{addMemberError}</Alert>}
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddMemberModal(false)}>
            Cancel
            </Button>
            <Button variant="primary" onClick={addMember} disabled={!email}>
            Invite
            </Button>
        </Modal.Footer>
        </Modal>
        </>
    );
};

export default MembersModal;