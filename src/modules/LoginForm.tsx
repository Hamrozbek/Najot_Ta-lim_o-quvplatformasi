import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { API } from '../hooks';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { LogoIcon } from '../assets/icons';

const LoginForm: React.FC = () => {
    const [, setCookies] = useCookies(["accessToken"])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onFinish = (values: any) => {
        setIsLoading(true)
        axios.post(`${API}/user/login`, values).then(res => {
            toast.success("Muvaffaqiyatli kirdingiz!", {
                onClose: () => {
                    setIsLoading(false);
                    setCookies("accessToken", res.data.accessToken)
                    location.pathname = "/"
                },
                autoClose: 1000,
            })
        })
    };

    return (
        <div className='w-full pt-[30px]'>
            <div className='flex items-center mb-[35px] justify-center gap-3'>
                <LogoIcon classList='w-[70px] h-[70px]'/>
                <span className='text-[30px] font-normal'>Admin paneli</span>
            </div>
            <Form autoComplete='off' className='w-full' name="login" style={{ maxWidth: 360 }} onFinish={onFinish}>
                <Form.Item name="username" rules={[{ required: true, message: 'Iltimos username kriting!' }]}>
                    <Input size="large" allowClear prefix={<UserOutlined />} placeholder="Kirish" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Iltimos parol kiriting' }]}>
                    <Input.Password size='large' prefix={<LockOutlined />} type="password" placeholder="Maxfiy so'z" />
                </Form.Item>
                <Button loading={isLoading} className='!bg-[#bc8e5b]' size="large" block type="primary" htmlType="submit">Kirish</Button>
            </Form>
        </div>
    );
};

export default LoginForm;