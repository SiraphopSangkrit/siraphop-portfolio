// app/api/experiences/[id]/route.ts - Individual experience operations
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Experience from '@/lib/models/Experience';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const experience = await Experience.findById(id);
    
    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: experience
    });
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch experience' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const updateData = await request.json();
    
    const experience = await Experience.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: experience
    });
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const experience = await Experience.findByIdAndDelete(id);
    
    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Experience not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}