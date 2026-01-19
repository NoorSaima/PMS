import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { CommonApi } from "@/lib/api/apiHelper";

// POST - Add Appointment
export async function POST(request: Request) {
    const session = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET
    });
    
    console.log('🔐 Session Info:', {
        hasSession: !!session,
        hasAccessToken: !!session?.accessToken,
        userId: session?.id,
        companyId: session?.companyId,
        tokenPrefix: session?.accessToken ? session.accessToken.substring(0, 20) + '...' : 'NO TOKEN'
    });
    
    if (!session || !session.accessToken || !session.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") || body.action;

    try {
        // List Appointments (with date filter) - from POST body
        if (action === "list") {
            console.log('✅ LIST handler triggered from POST');
            
            const appointmentDate = body.appointmentDate;
            const practiceId = body.practiceId;
            const resourceIds = body.resourceIds || "";

            console.log('🔍 GET APPOINTMENTS BY DATE - Request Details:');
            console.log('  - AppointmentDate:', appointmentDate);
            console.log('  - PracticeId:', practiceId);
            console.log('  - ResourceIds:', resourceIds);
            console.log('  - Has Token:', !!session?.accessToken);

            if (!appointmentDate) {
                console.error('❌ Missing appointmentDate');
                return NextResponse.json({ 
                    success: false,
                    message: "AppointmentDate is required" 
                }, { status: 400 });
            }

            if (!practiceId) {
                console.error('❌ Missing practiceId');
                return NextResponse.json({ 
                    success: false,
                    message: "PracticeId is required" 
                }, { status: 400 });
            }

            if (!session?.accessToken) {
                console.error('❌ Missing accessToken');
                return NextResponse.json({ 
                    success: false,
                    message: "No access token found" 
                }, { status: 401 });
            }

            // Backend URL with GET method
            const apiUrl = `${process.env.API_BASE_URL}/api/Appintment/GetAppointments?appointmentDate=${appointmentDate}&practiceId=${practiceId}&resourceIds=${resourceIds}`;
            console.log('📤 Payload:', { appointmentDate, practiceId, resourceIds });
            console.log('🔗 Backend GET URL:', apiUrl);
            console.log('🚀 Token Length:', session.accessToken.length);

            try {
                const response = await CommonApi(
                    apiUrl,
                    "GET",
                    session.accessToken,
                    undefined,
                    "Appointments"
                );

                console.log('📥 Backend Response:', {
                    success: response.success,
                    message: response.message,
                    dataLength: Array.isArray(response.data) ? response.data.length : 'N/A'
                });

                if (!response.success) {
                    console.error('❌ API Error:', response.message);
                    return NextResponse.json({ 
                        success: false,
                        message: response.message || "Failed to fetch appointments" 
                    }, { status: 400 });
                }

                return NextResponse.json({ 
                    success: true,
                    data: response.data || []
                });
            } catch (error: any) {
                console.error('💥 Exception in list handler:', error);
                return NextResponse.json({ 
                    success: false,
                    message: error.message || "Server error fetching appointments" 
                }, { status: 500 });
            }
        }

        // Add Appointment
        if (action === "add" || (!action && !body.appointmentDate)) {
            interface AddAppointmentPayload {
                PatientID: string;
                AppointmentDate: string;
                AppointmentTime: string;
                AppointmentLength: number;
                AppointmentType: string;
                ResourceID: string;
                FacilityID: string;
                AppointmentStatus: string;
                AllowAppointmenttoOverBook: number;
                Comment: string;
                RepeatAppointment: number;
                RepeatDurationDays: number;
                RepeatDurationDuration: string;
                EndAfter: number;
                EndOn: string;
                AddedBy: string;
                PracticeId: string;
            }

            const payload: AddAppointmentPayload = {
                PatientID: body.PatientID,
                AppointmentDate: body.AppointmentDate,
                AppointmentTime: body.AppointmentTime,
                AppointmentLength: body.AppointmentLength,
                AppointmentType: body.AppointmentType,
                ResourceID: body.ResourceID,
                FacilityID: body.FacilityID,
                AppointmentStatus: body.AppointmentStatus,
                AllowAppointmenttoOverBook: body.AllowAppointmenttoOverBook,
                Comment: body.Comment,
                RepeatAppointment: body.RepeatAppointment,
                RepeatDurationDays: body.RepeatDurationDays,
                RepeatDurationDuration: body.RepeatDurationDuration,
                EndAfter: body.EndAfter,
                EndOn: body.EndOn,
                AddedBy: body.AddedBy || session.id,
                PracticeId: body.PracticeId
            };

            console.log('🔍 Adding Appointment to:', `${process.env.API_BASE_URL}/api/Appintment/AddAppointment`);
            console.log('📤 Appointment Payload:', payload);
            console.log('🏥 PRACTICE ID BEING SAVED:', payload.PracticeId);

            // Add CompanyId to URL if required by backend
                const apiUrl = `${process.env.API_BASE_URL}/api/Appintment/AddAppointment${session.companyId ? `?CompanyId=${session.companyId}` : ''}`;
                console.log('🔗 Full API URL:', apiUrl);
                console.log('🔗 token (session.accessToken):', session.accessToken || 'NO TOKEN');
            // TOKEN PRINT 
            console.log('🚀 ==================== TOKEN BEING SENT ====================');
            console.log('🔑 TOKEN FOR POSTMAN/DEBUGGING:');
            console.log('FULL TOKEN:', session.accessToken);
            console.log('TOKEN LENGTH:', session.accessToken.length);
            console.log('FIRST 100 CHARS:', session.accessToken.substring(0, 100));
            console.log('LAST 100 CHARS:', session.accessToken.substring(session.accessToken.length - 100));
            console.log('🚀 =========================================================');
            
            // Copy-paste ke liye formatted output
            console.log('\n📋 COPY THIS FOR POSTMAN:');
            console.log(`Bearer ${session.accessToken}`)
            const response = await CommonApi(
                apiUrl,
                "POST",
                session?.accessToken,
                payload,
                "Appointment"
            );

            console.log('📥 Add Appointment Response:', { success: response.success, message: response.message });

            if (!response.success) {
                console.error('❌ Add Appointment Error:', response.message, response.data);
                return NextResponse.json({ 
                    success: false,
                    message: response.message || "Failed to add appointment",
                    data: response.data
                }, { status: 400 });
            }

            return NextResponse.json({ 
                success: true,
                message: response.message,
                data: response.data 
            });
        }

        // Add Provider Appointment Schedule
        if (action === "add-schedule") {
            interface AddProviderSchedulePayload {
                PracticeID: string;
                FacilityID: string;
                ProviderID: string;
                SlotFrom: string;
                SlotTo: string;
                AllowScheduleWOSlot: number;
                AddedBy: string;
                IpAddress: string;
            }

            const payload: AddProviderSchedulePayload = {
                PracticeID: body.PracticeID,
                FacilityID: body.FacilityID,
                ProviderID: body.ProviderID,
                SlotFrom: body.SlotFrom,
                SlotTo: body.SlotTo,
                AllowScheduleWOSlot: body.AllowScheduleWOSlot,
                AddedBy: body.AddedBy || session.id,
                IpAddress: body.IpAddress
            };

            const response = await CommonApi(
                `${process.env.API_BASE_URL}/api/Appintment/AddProviderAppointSchedule`,
                "POST",
                session?.accessToken,
                payload,
                "Provider Schedule"
            );

            if (!response.success) {
                return NextResponse.json({ 
                    message: response.message || "Failed to add provider schedule" 
                }, { status: 400 });
            }

            return NextResponse.json({ 
                success: true,
                message: response.message,
                data: response.data 
            });
        }

        return NextResponse.json({ 
            message: "Invalid action parameter" 
        }, { status: 400 });

    } catch (error) {
        console.error("❌ Appointment POST Error:", error);
        console.error("❌ Error details:", {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
        return NextResponse.json({ 
            message: error instanceof Error ? error.message : "Internal Server Error",
            error: process.env.NODE_ENV === 'development' ? String(error) : undefined
        }, { status: 500 });
    }
}

// GET - Get Appointments, Status, Type, Schedule
export async function GET(request: Request) {
    
    const session = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET
    });
    
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    
    if (!session) {
        console.error('❌ Unauthorized - No session');
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        // Get Appointment Status
        if (action === "status") {
            const apiUrl = `${process.env.API_BASE_URL}/api/Appintment/GetAppointmentStatus${session.companyId ? `?CompanyId=${session.companyId}` : ''}`;
            console.log('🔍 Fetching Appointment Status from:', apiUrl);
            const response = await CommonApi(
                apiUrl,
                "GET",
                session?.accessToken,
                undefined,
                "Appointment Status"
            );
            console.log(`token used: ${session?.accessToken}`);
             console.log("api url is",apiUrl);     
            if (!response.success) {
                console.error('❌ Status API Error:', response.message);
                return NextResponse.json({ 
                    success: false,
                    message: response.message || "Failed to fetch appointment status",
                    data: response.data
                }, { status: 400 });
            }

            return NextResponse.json({ 
                success: true,
                data: response.data 
            });
        }

        // Get Appointment Type
        if (action === "type") {
            const apiUrl = `${process.env.API_BASE_URL}/api/Appintment/GetAppointmentType${session.companyId ? `?CompanyId=${session.companyId}` : ''}`;
            console.log('🔍 Fetching Appointment Type from:', apiUrl);
            const response = await CommonApi(
                apiUrl,
                "GET",
                session?.accessToken,
                undefined,
                "Appointment Type"
            );

            console.log('📥 Type API Response:', { success: response.success, message: response.message, dataLength: Array.isArray(response.data) ? response.data.length : 'N/A' });

            if (!response.success) {
                console.error('❌ Type API Error:', response.message);
                return NextResponse.json({ 
                    success: false,
                    message: response.message || "Failed to fetch appointment type",
                    data: response.data
                }, { status: 400 });
            }

            return NextResponse.json({ 
                success: true,
                data: response.data 
            });
        }

        // Get Appointments (with date filter)
        if (action === "list") {
            console.log('✅ [GET] Entered LIST handler');
            console.log('🔍 [GET] Request params:', {
                appointmentDate: searchParams.get("appointmentDate"),
                practiceId: searchParams.get("practiceId"),
                resourceIds: searchParams.get("resourceIds"),
                hasSession: !!session,
                hasToken: !!session?.accessToken,
                companyId: session?.companyId
            });
            
            const appointmentDate = searchParams.get("appointmentDate");
            const practiceId = searchParams.get("practiceId");
            const resourceIds = searchParams.get("resourceIds") || "";

            if (!appointmentDate) {
                console.error('❌ Missing appointmentDate');
                return NextResponse.json({ 
                    success: false,
                    message: "AppointmentDate is required" 
                }, { status: 400 });
            }

            if (!practiceId) {
                console.error('❌ Missing practiceId');
                return NextResponse.json({ 
                    success: false,
                    message: "PracticeId is required" 
                }, { status: 400 });
            }

            if (!session?.accessToken) {
                console.error('❌ Missing accessToken');
                return NextResponse.json({ 
                    success: false,
                    message: "No access token found" 
                }, { status: 401 });
            }

            
            // Backend API URL - without CompanyId
            const apiUrl = `${process.env.API_BASE_URL}/api/Appintment/GetAppointments?appointmentDate=${appointmentDate}&practiceId=${practiceId}&resourceIds=${resourceIds}`;
            console.log('🔗 [GET] Backend API URL:', apiUrl);
            console.log('🔑 [GET] Token available:', !!session.accessToken, 'Length:', session.accessToken?.length || 0);
           
            try {
                const response = await CommonApi(
                    apiUrl,
                    "GET",
                    session.accessToken,
                    undefined,
                    "Appointments"
                );
                console.log("📥 [GET] Backend response:", {
                    success: response.success,
                    message: response.message,
                    hasData: !!response.data,
                    dataType: typeof response.data,
                    dataLength: Array.isArray(response.data) ? response.data.length : 'Not an array',
                    rawData: response.data
                });
               
                if (!response.success) {
                    console.error('❌ API Error:', {
                        message: response.message,
                        data: response.data
                    });
                    return NextResponse.json({ 
                        success: false,
                        message: response.message || "Failed to fetch appointments" 
                    }, { status: 400 });
                }

                return NextResponse.json({ 
                    success: true,
                    data: response.data || []
                });
            } catch (error: any) {
                console.error('💥 Exception in list handler:', error);
                return NextResponse.json({ 
                    success: false,
                    message: error.message || "Server error fetching appointments" 
                }, { status: 500 });
            }
        }

        // Get Provider Appointment Schedule
        if (action === "schedule") {
            const practiceId = searchParams.get("PracticeID");
            const facilityId = searchParams.get("FacilityID");
            const providerId = searchParams.get("ProviderID");

            const response = await CommonApi(
                `${process.env.API_BASE_URL}/api/Appintment/GetAppointmentSchedule?PracticeID=${practiceId}&FacilityID=${facilityId}&ProviderID=${providerId}`,
                "GET",
                session?.accessToken,
                undefined,
                "Provider Schedule"
            );

            if (!response.success) {
                return NextResponse.json({ 
                    message: response.message || "Failed to fetch provider schedule" 
                }, { status: 400 });
            }

            return NextResponse.json({ 
                success: true,
                data: response.data 
            });
        }

        console.error('❌ Invalid or unhandled action:', action);
        return NextResponse.json({ 
            success: false,
            message: `Invalid action parameter: ${action}`,
            validActions: ['status', 'type', 'list', 'schedule']
        }, { status: 400 });

    } catch (error: any) {
        console.error("❌ Appointment GET Error:", error);
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        return NextResponse.json({ 
            success: false,
            message: `❌ Server error – ${error.message || 'Please try again later'}`,
            error: error.message,
            errorType: error.name
        }, { status: 500 });
    }
}

// PUT - Edit Appointment, Edit Status, Edit Schedule
export async function PUT(request: Request) {
    const session = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET
    });
    
    if (!session || !session.accessToken || !session.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const body = await request.json();

    try {
        // Edit Appointment
        if (action === "edit" || !action) {
            interface EditAppointmentPayload {
                AppointmentID: string;
                PatientID: string;
                AppointmentDate: string;
                AppointmentTime: string;
                AppointmentLength: number;
                AppointmentType: string;
                ResourceID: string;
                FacilityID: string;
                AppointmentStatus: string;
                AllowAppointmenttoOverBook: number;
                Comment: string;
                RepeatAppointment: number;
                RepeatDurationDays: number;
                RepeatDurationDuration: string | null;
                EndAfter: number;
                EndOn: string;
                UpdateBy: string;
            }

            const payload: EditAppointmentPayload = {
                AppointmentID: body.AppointmentID,
                PatientID: body.PatientID,
                AppointmentDate: body.AppointmentDate,
                AppointmentTime: body.AppointmentTime,
                AppointmentLength: body.AppointmentLength,
                AppointmentType: body.AppointmentType,
                ResourceID: body.ResourceID,
                FacilityID: body.FacilityID,
                AppointmentStatus: body.AppointmentStatus,
                AllowAppointmenttoOverBook: body.AllowAppointmenttoOverBook,
                Comment: body.Comment,
                RepeatAppointment: body.RepeatAppointment,
                RepeatDurationDays: body.RepeatDurationDays,
                RepeatDurationDuration: body.RepeatDurationDuration,
                EndAfter: body.EndAfter,
                EndOn: body.EndOn,
                UpdateBy: body.UpdateBy || session.id
            };

            const response = await CommonApi(
                `${process.env.API_BASE_URL}/api/Appintment/EditAppointment`,
                "PUT",
                session?.accessToken,
                payload,
                "Appointment"
            );

            if (!response.success) {
                return NextResponse.json({ 
                    message: response.message || "Failed to update appointment" 
                }, { status: 400 });
            }

            return NextResponse.json({ 
                success: true,
                message: response.message,
                data: response.data 
            });
        }

        // Edit Appointment Status
        if (action === "edit-status") {
            const appointmentId = searchParams.get("AppointmentId");
            const statusId = searchParams.get("StatusId");
            const updateBy = searchParams.get("updateBy") || session.id;
            const ipAddress = searchParams.get("IpAddress");

            const response = await CommonApi(
                `${process.env.API_BASE_URL}/api/Appintment/EditAppointmentStatus?AppointmentId=${appointmentId}&StatusId=${statusId}&updateBy=${updateBy}&IpAddress=${ipAddress}`,
                "PUT",
                session?.accessToken,
                undefined,
                "Appointment Status"
            );

            if (!response.success) {
                return NextResponse.json({ 
                    message: response.message || "Failed to update appointment status" 
                }, { status: 400 });
            }

            return NextResponse.json({ 
                success: true,
                message: response.message,
                data: response.data 
            });
        }

        // Edit Provider Appointment Schedule
        if (action === "edit-schedule") {
            interface EditProviderSchedulePayload {
                ProviderScheduleID: string;
                PracticeID: string;
                FacilityID: string;
                ProviderID: string;
                SlotFrom: string;
                SlotTo: string;
                AllowScheduleWOSlot: number;
                UpdateBy: string;
                IpAddress: string;
            }

            const payload: EditProviderSchedulePayload = {
                ProviderScheduleID: body.ProviderScheduleID,
                PracticeID: body.PracticeID,
                FacilityID: body.FacilityID,
                ProviderID: body.ProviderID,
                SlotFrom: body.SlotFrom,
                SlotTo: body.SlotTo,
                AllowScheduleWOSlot: body.AllowScheduleWOSlot,
                UpdateBy: body.UpdateBy || session.id,
                IpAddress: body.IpAddress
            };

            const response = await CommonApi(
                `${process.env.API_BASE_URL}/api/Appintment/EditProviderAppointSchedule`,
                "PUT",
                session?.accessToken,
                payload,
                "Provider Schedule"
            );

            if (!response.success) {
                return NextResponse.json({ 
                    message: response.message || "Failed to update provider schedule" 
                }, { status: 400 });
            }

            return NextResponse.json({ 
                success: true,
                message: response.message,
                data: response.data 
            });
        }

        return NextResponse.json({ 
            message: "Invalid action parameter" 
        }, { status: 400 });

    } catch (error) {
        console.error("Appointment PUT Error:", error);
        return NextResponse.json({ 
            message: "Internal Server Error" 
        }, { status: 500 });
    }
}
// DELETE - Delete Provider Appointment Schedule
export async function DELETE(request: Request) {
    const session = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET
    });
    
    if (!session || !session.accessToken || !session.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const body = await request.json();

    try {
        interface DeleteProviderSchedulePayload {
            ProviderScheduleID: string;
            DeleteBy: string;
            IpAddress: string;
        }

        const payload: DeleteProviderSchedulePayload = {
            ProviderScheduleID: body.ProviderScheduleID,
            DeleteBy: body.DeleteBy || session.id,
            IpAddress: body.IpAddress
        };

        const response = await CommonApi(
            `${process.env.API_BASE_URL}/api/Appintment/DeleteProviderAppointSchedule`,
            "DELETE",
            session?.accessToken,
            payload,
            "Provider Schedule"
        );

        if (!response.success) {
            return NextResponse.json({ 
                message: response.message || "Failed to delete provider schedule" 
            }, { status: 400 });
        }

        return NextResponse.json({ 
            success: true,
            message: response.message,
            data: response.data 
        });

    } catch (error) {
        console.error("Appointment DELETE Error:", error);
        return NextResponse.json({ 
            message: "Internal Server Error" 
        }, { status: 500 });
    }
}
