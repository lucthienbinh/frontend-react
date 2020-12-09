import React, {useState, useEffect} from 'react';
import './index.css';

import { useCookies } from 'react-cookie';
import CustomerCard from '../../../../../Components/CustomerCard';
import Loading from '../../../../Loading'

export default function CustomerList() {
  const [cookies, setCookie, removeCookie] = useCookies(['csrf']);
  
  const [ customers, setCustomers] = useState([]);
  const [ isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customer/list", {
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
      .then((json) => setCustomers(json.customer_list))
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        removeCookie("csrf", { path: "/" });
      });
  }, []);
 
  const customerCards = customers.map((customer, index) => <CustomerCard key={index} customer={customer} />)

  if (isLoading) {
    return <Loading />;
  } else {
    return <div>{customerCards}</div>;
  }
  
}