import { useDispatch, useSelector } from "react-redux"
import OrganizationDropdown from "../components/dashboard/OrganizationDropdown";
import { useEffect } from "react";
import { fetchSelectedOrganization } from "../redux/slices/organizationSlice";

export default function () {
    const { user,organizations } = useSelector(state => state.user);
    const { isLoading } = useSelector(state => state.organization);
    const dispatch = useDispatch()

    useEffect(() => {   
        if (user?._id) {
            let selectOrgId = null;
            
            if (organizations?.ownedOrganizations.length > 0)
                selectOrgId = organizations.ownedOrganizations[0].organizationId;
            else if (organizations?.activeOrganizations.length > 0)
                selectOrgId = organizations.activeOrganizations[0].organizationId;
            else if (organizations?.clientOrganizations.length > 0)
                selectOrgId = organizations.clientOrganizations[0].organizationId;
            
            dispatch(fetchSelectedOrganization(selectOrgId));
        }
    }, []);


    if (isLoading) {
        console.log('called');
        
        return <div>
            Loading....
        </div>
    }

    return <>
        <OrganizationDropdown />
    </>
}