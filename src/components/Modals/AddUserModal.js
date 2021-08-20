// import { Dialog, DialogActions, DialogContent, DialogTitle, Input, Button } from '@material-ui/core';
import React from 'react';
import { AppContext } from '../../Context/AppProvider';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { db } from '../../Firebase/config';
import { debounce } from 'lodash';
const DebounceSelect = ({ fetchOptions,
    debounceTimeout = 300,
    curMembers,
    ...props }) => {

    //search sdsadsa
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState([]);

    const DebouceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, curMembers, fetchOptions])
    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return <Select
        labelInValue
        filterOption={false}
        onSearch={DebouceFetcher}
        notFoundContent={fetching ? <Spin size='small' /> : null}
        {...props}>
        {
            options?.map(opt => <Select.Option key={opt.value} title={opt.label}>
                <Avatar size="small" src={opt.photoURL}> {opt?.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()} </Avatar>{opt.label}
            </Select.Option>)
        }
    </Select>
}

const AddUserModal = () => {
    const { isVisibleAddUsersModal, setIsVisibleAddUsersModal, selectedRoom, selectedRoomId } = React.useContext(AppContext);
    const [value, setValue] = React.useState([]);
    const [form] = Form.useForm()
    const handleOk = () => {
        //handle logic
        form.resetFields();
        setValue([])
        ///
        const roomRef = db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        })

        setIsVisibleAddUsersModal(false);
    }
    const handleCancel = () => {
        //handle logic
        form.resetFields();
        setValue([])
        setIsVisibleAddUsersModal(false);
    }

    const fetchUserList = async (search, curMembers) => {
        //handle logic
        return db.collection('users').orderBy('displayName').where('keywords', 'array-contains', search?.toLowerCase()).limit(20).get().then((snapshot) => {
            return snapshot.docs.map(doc => ({ label: doc.data().displayName, value: doc.data().uid, photoURL: doc.data().photoURL })).filter(opt => !curMembers.includes(opt.value))
        });

    }

    return (
        <div>
            {/* <Dialog open={isVisibleAddUsersModal}>
                <DialogTitle>Thêm bạn vào nhóm</DialogTitle>
                <DialogContent>
                    <Input placeholder="Nhập tên user" />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleAddUser} >Thêm</Button>
                    <Button variant="contained" color="secondary" onClick={() => setIsVisibleAddUsersModal(false)}>Cancle</Button>
                </DialogActions>
            </Dialog> */}
            <Modal
                title='Mời thêm thành viên'
                visible={isVisibleAddUsersModal}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        name='search-user'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom?.members}
                    />
                </Form>
            </Modal>
        </div>
    );
};

export default AddUserModal;