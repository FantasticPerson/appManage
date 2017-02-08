bool GetComputerSecurityId( wchar_t security_id[64] )
{
    wchar_t account_name[MAX_PATH] = {0};
    unsigned long account_len = MAX_PATH;
    wchar_t sid[MAX_PATH] = {0};
    char sid_buffer[24] = {0};
    if ( GetComputerNameW( account_name,&account_len ))
    {
        if( AddAccessRights( account_name , &sid , 2*MAX_PATH ))
        {
            ConvertSidToStringSidW( &sid,(LPWSTR *)sid_buffer );
            if ( security_id && (*(unsigned long*)sid_buffer) )
            {
                memcpy( security_id , (const void *)(*(unsigned long*)sid_buffer) , MAX_PATH );

                LocalFree( (HLOCAL)(*(unsigned long*)sid_buffer) );
            }
        }
    }

    return false;
}


bool AddAccessRights(wchar_t* lpAccountName,PSID Sid,unsigned long cb_sid_len )
{
    wchar_t* account_name = (wchar_t*)HeapAlloc( GetProcessHeap(),0, 2*MAX_PATH );
    unsigned long cchReferencedDomainName ;
    SID_NAME_USE peUse;
    unsigned long cbSid;
    BOOLisSuccess = 0;

    cbSid = cb_sid_len;
    cchReferencedDomainName = 2*MAX_PATH;
    if ( account_name )
    {
        isSuccess = LookupAccountNameW(NULL,lpAccountName,Sid,&cbSid,account_name,&cchReferencedDomainName,&peUse );
        if ( !isSuccess )
        {
            if ( GetLastError() == 122 )
            {
                if ( cbSid <= cb_sid_len )
                {
                    if ( cchReferencedDomainName > 128 )
                    {
                        cchReferencedDomainName = 2 * cchReferencedDomainName;
                    }

                    isSuccess = LookupAccountNameW(NULL,lpAccountName,Sid,&cbSid,account_name,&cchReferencedDomainName,&peUse);
                }
            }
        }
    }

    if ( account_name )
    {
        HeapFree( GetProcessHeap() , 0 , account_name );
        account_name = NULL;
    }

    return isSuccess;
}

bool GetVolumeSerialNumber( unsigned long* serial )
{
    char root_name[MAX_PATH] = {0};
    char* root_disk = 0;
    unsigned long VolumeSerialNumber = 0;
    if( GetSystemDirectory( root_name ,
    MAX_PATH ) && serial )
    {
        if ( root_disk = strstr( root_name, "\\") )
        {
            root_disk[1] = 0;
            *serial = 0;
            if ( GetVolumeInformation(&root_name[0],0,0,&VolumeSerialNumber,0,0,0,0) )
            {
                *serial = VolumeSerialNumber;
                return true;
            }

        }
    }

    return false;
}


bool GetComputerHashSha1(char* hash_id )
{
    wchar_t wcSid[200] = {0};
    unsigned long SerialNumber = 0;

    GetComputerSecurityId( wcSid );
    GetVolumeSerialNumber(&SerialNumber);

    char szhashId[40] = {0};
    base::SHA1HashBytes( (const unsigned char *)wcSid , 2*lstrlenW(wcSid) , (unsigned char *)szhashId );
    return true;
}