import React, {useState, useEffect} from 'react';
import './index.css';

import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import CustomerCard from '../../../../../Components/CustomerCard';
import Loading from '../../../../Loading'

export default function CustomerDetail() {
  const [cookies, setCookie, removeCookie] = useCookies(['csrf']);
  
  const [ customer, setCustomer] = useState({});
  const [ isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    fetch("/api/customer/id/" + id, {
      headers: {
        "X-CSRF-Token": cookies.csrf,
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Unauthorized");
        }
        return res.json();
      })
      .then((json) => setCustomer(json.customer_info))
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        removeCookie("csrf", { path: "/" });
      });
  }, []);
 
  if (isLoading) {
    return <Loading />;
  } else {
    return <CustomerCard customer={customer}/>;
  }
  
}