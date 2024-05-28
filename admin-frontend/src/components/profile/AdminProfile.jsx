import { useEffect, useState } from "react";
import { getUserByUsername } from "../../services/client";
import { getAuthenticatedUser } from "../../services/auth";
import { 
    Image, 
    Center, 
    Text, 
    Box, 
    Button,
    Drawer, 
	DrawerOverlay,
	DrawerContent, 
	DrawerCloseButton, 
	DrawerHeader, 
	DrawerBody,
    useDisclosure,
    Divider,
    Stack
} from "@chakra-ui/react";
import { MdBuild } from "react-icons/md";
import { verify, updateUser } from "../../services/client";
import { Formik, Form } from 'formik';
import { TextInput, FileInput } from '../shared/FormComponents.jsx';
import { successNotification, errorNotification } from '../../services/notification.js';

const AdminProfile = () => {
    
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAdmin();
    }, []);

    const fetchAdmin = () => {
        setLoading(true);
        getUserByUsername(getAuthenticatedUser()).then(res => {
            setAdmin(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(setLoading(false));
    };

    if (loading) {
        return (<Text size={'ms'}>Fetch user data...</Text>);
    }

    if (admin == null) {
        return (
            <Text size={'ms'}>Sorry! Something went wrong!</Text>
        );
    }
    else {
        return (
            <>
                <Center mt={5}>
                    <Image
                        borderRadius='full'
                        boxSize='150px'
                        src={admin.avatar}
                        alt='Dan Abramov'
                    />
                </Center>
                <Center mt={5}>
                    <Box>
                        <Text my={2}><strong>Id: </strong> {admin.id}</Text>
                        <Text my={2}><strong>Fullname: </strong> {admin.fullname}</Text>
                        <Text my={2}><strong>Username: </strong> <i>@{admin.username}</i></Text>
                        <Text my={2}><strong>Email: </strong> {admin.email}</Text>
                        <Text my={2}><strong>Role: </strong> {admin.role.name}</Text>
                    </Box>
                </Center>
            </>
        );
    }
}

export default AdminProfile;