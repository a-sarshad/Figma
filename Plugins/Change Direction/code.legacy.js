// Figma Plugin: Change Direction (No UI) - تغییر جهت لایوت
// تغییر جهت تمام فریم های Auto Layout و متن ها - نسخه بهبود یافته برای Instance ها
// داخل Instance ها فقط Corner Radius و Border تغییر می‌کنند

// اجرای مستقیم پلاگین بدون UI
(function() {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify('⚠️ لطفاً حداقل یک element انتخاب کنید', { error: true });
    figma.closePlugin();
    return;
  }

  let processedFrames = 0;
  let processedTexts = 0;
  let errorCount = 0;
  let instancesSkipped = 0;
  let instancesDetached = 0;
  let textsInInstancesSkipped = 0;

  // تابع برای بررسی اینکه آیا یک property قابل override است
  function canOverrideProperty(instance, propertyName) {
    try {
      // بررسی اینکه آیا property در overrides موجود است
      if (instance.overrides && instance.overrides.length > 0) {
        return instance.overrides.some(override => 
          override.overriddenFields && 
          override.overriddenFields.includes(propertyName)
        );
      }
      
      // اگر component definition در دسترس است، بررسی exposed properties
      if (instance.mainComponent && instance.mainComponent.componentPropertyDefinitions) {
        const definitions = instance.mainComponent.componentPropertyDefinitions;
        return Object.keys(definitions).includes(propertyName);
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  // تابع برای detach کردن instance (با confirmation)
  function detachInstanceIfNeeded(instance, reason) {
    try {
      // فعلاً فقط log می‌کنیم و detach نمی‌کنیم
      // در آینده می‌توان یک UI اضافه کرد تا کاربر تصمیم بگیرد
      console.log(`Instance "${instance.name}" needs detaching for: ${reason}`);
      instancesSkipped++;
      return false;
      
      // برای فعال کردن detach کردن خودکار، uncomment کنید:
      /*
      instance.detachInstance();
      instancesDetached++;
      return true;
      */
    } catch (error) {
      console.error('Error detaching instance:', error);
      return false;
    }
  }

  // تابع برای بررسی اینکه آیا node داخل instance قرار دارد
  function isInsideInstance(node) {
    let parent = node.parent;
    while (parent) {
      if (parent.type === 'INSTANCE') {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }

  // تابع برای پردازش instance ها - فقط corner radius و border
  function processInstanceOnly(instance) {
    try {
      console.log('Processing instance (limited):', instance.name);
      
      // فقط corner radius
      swapCornerRadius(instance);
      
      // فقط border
      swapBorders(instance);
      
      processedFrames++;
      
    } catch (error) {
      console.error('خطا در پردازش instance:', error);
      errorCount++;
    }
  }

  // تابع برای تعویض padding چپ و راست
  function swapPadding(element) {
    try {
      if ('paddingLeft' in element && 'paddingRight' in element) {
        // حفظ مقادیر فعلی
        const originalLeftValue = element.paddingLeft;
        const originalRightValue = element.paddingRight;
        
        // بررسی اینکه آیا مقادیر متفاوت هستند
        if (originalLeftValue === originalRightValue) {
          return; // اگر یکسان هستند، نیازی به تعویض نیست
        }

        // حفظ binding متغیرها
        const leftBinding = element.boundVariables ? element.boundVariables.paddingLeft : undefined;
        const rightBinding = element.boundVariables ? element.boundVariables.paddingRight : undefined;
        
        // حذف binding ها
        if (leftBinding) {
          element.setBoundVariable('paddingLeft', null);
        }
        if (rightBinding) {
          element.setBoundVariable('paddingRight', null);
        }
        
        // تعویض مقادیر
        element.paddingLeft = originalRightValue;
        element.paddingRight = originalLeftValue;
        
        // تنظیم binding های جدید
        if (leftBinding && rightBinding) {
          element.setBoundVariable('paddingLeft', rightBinding);
          element.setBoundVariable('paddingRight', leftBinding);
        } else if (leftBinding) {
          element.setBoundVariable('paddingRight', leftBinding);
        } else if (rightBinding) {
          element.setBoundVariable('paddingLeft', rightBinding);
        }
      }
    } catch (error) {
      console.error('خطا در تعویض padding:', error);
      errorCount++;
    }
  }

  // تابع برای تعویض corner radius ها - نسخه بهبود یافته
  function swapCornerRadius(element) {
    try {
      const hasCornerRadius = (
        'topLeftRadius' in element && 'topRightRadius' in element &&
        'bottomLeftRadius' in element && 'bottomRightRadius' in element
      );

      if (hasCornerRadius) {
        // حفظ binding متغیرها قبل از گرفتن مقادیر
        const topLeftBinding = element.boundVariables && element.boundVariables.topLeftRadius;
        const topRightBinding = element.boundVariables && element.boundVariables.topRightRadius;
        const bottomLeftBinding = element.boundVariables && element.boundVariables.bottomLeftRadius;
        const bottomRightBinding = element.boundVariables && element.boundVariables.bottomRightRadius;
        
        // حفظ مقادیر فعلی برای بررسی
        const originalTopLeftValue = element.topLeftRadius;
        const originalTopRightValue = element.topRightRadius;
        const originalBottomLeftValue = element.bottomLeftRadius;
        const originalBottomRightValue = element.bottomRightRadius;
        
        // بررسی اینکه آیا نیاز به تعویض است
        const needTopSwap = originalTopLeftValue !== originalTopRightValue;
        const needBottomSwap = originalBottomLeftValue !== originalBottomRightValue;
        
        // اگر هیچکدام نیاز به تعویض ندارند، return کن
        if (!needTopSwap && !needBottomSwap) {
          return;
        }

        // برای instance ها
        if (element.type === 'INSTANCE') {
          // بررسی اینکه آیا corner radius properties قابل override هستند
          const canOverrideCorners = [
            'topLeftRadius', 'topRightRadius', 
            'bottomLeftRadius', 'bottomRightRadius'
          ].every(prop => canOverrideProperty(element, prop));
          
          if (!canOverrideCorners) {
            try {
              // حذف binding ها برای آن هایی که نیاز به تعویض دارند
              if (needTopSwap) {
                if (topLeftBinding && 'setBoundVariable' in element) {
                  element.setBoundVariable('topLeftRadius', null);
                }
                if (topRightBinding && 'setBoundVariable' in element) {
                  element.setBoundVariable('topRightRadius', null);
                }
              }
              if (needBottomSwap) {
                if (bottomLeftBinding && 'setBoundVariable' in element) {
                  element.setBoundVariable('bottomLeftRadius', null);
                }
                if (bottomRightBinding && 'setBoundVariable' in element) {
                  element.setBoundVariable('bottomRightRadius', null);
                }
              }
              
              // تعویض مقادیر - فقط آن هایی که نیاز دارند
              if (needTopSwap) {
                element.topLeftRadius = originalTopRightValue;
                element.topRightRadius = originalTopLeftValue;
              }
              if (needBottomSwap) {
                element.bottomLeftRadius = originalBottomRightValue;
                element.bottomRightRadius = originalBottomLeftValue;
              }
              
              // تنظیم binding های جدید - تعویض شده
              if (needTopSwap) {
                if (topLeftBinding && 'setBoundVariable' in element) {
                  element.setBoundVariable('topRightRadius', topLeftBinding);
                }
                if (topRightBinding && 'setBoundVariable' in element) {
                  element.setBoundVariable('topLeftRadius', topRightBinding);
                }
              }
              if (needBottomSwap) {
                if (bottomLeftBinding && 'setBoundVariable' in element) {
                  element.setBoundVariable('bottomRightRadius', bottomLeftBinding);
                }
                if (bottomRightBinding && 'setBoundVariable' in element) {
                  element.setBoundVariable('bottomLeftRadius', bottomRightBinding);
                }
              }
              
              console.log('Corner radius force-swapped for instance:', element.name);
              
            } catch (instanceError) {
              console.log('Cannot swap corner radius for instance:', element.name);
              return detachInstanceIfNeeded(element, 'corner radius swap');
            }
            return;
          }
        }

        // برای غیر instance ها یا instance هایی که قابل override هستند
        // حذف binding ها برای آن هایی که نیاز به تعویض دارند
        try {
          if (needTopSwap) {
            if (topLeftBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('topLeftRadius', null);
            }
            if (topRightBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('topRightRadius', null);
            }
          }
          if (needBottomSwap) {
            if (bottomLeftBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('bottomLeftRadius', null);
            }
            if (bottomRightBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('bottomRightRadius', null);
            }
          }
        } catch (bindingError) {
          // ادامه می‌دهیم
        }
        
        // تعویض مقادیر - فقط آن هایی که نیاز دارند
        if (needTopSwap) {
          element.topLeftRadius = originalTopRightValue;
          element.topRightRadius = originalTopLeftValue;
        }
        if (needBottomSwap) {
          element.bottomLeftRadius = originalBottomRightValue;
          element.bottomRightRadius = originalBottomLeftValue;
        }
        
        // تنظیم binding های جدید - فقط برای آن هایی که تعویض شدند
        try {
          if (needTopSwap) {
            if (topLeftBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('topRightRadius', topLeftBinding);
            }
            if (topRightBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('topLeftRadius', topRightBinding);
            }
          }
          if (needBottomSwap) {
            if (bottomLeftBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('bottomRightRadius', bottomLeftBinding);
            }
            if (bottomRightBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('bottomLeftRadius', bottomRightBinding);
            }
          }
        } catch (bindingError) {
          // مقادیر به صورت fixed تنظیم شده‌اند
        }
        
        console.log('Corner radius swapped for element:', element.name || element.type);
      }
    } catch (error) {
      console.error('خطا در تعویض corner radius:', error);
      errorCount++;
    }
  }

  // تابع برای تعویض border های چپ و راست - نسخه بهبود یافته
  function swapBorders(element) {
    try {
      const hasBorders = (
        'strokeLeftWeight' in element && 'strokeRightWeight' in element
      );

      if (hasBorders) {
        // حفظ مقادیر فعلی برای بررسی
        const originalLeftWeight = element.strokeLeftWeight;
        const originalRightWeight = element.strokeRightWeight;
        
        // بررسی اینکه آیا مقادیر متفاوت هستند
        if (originalLeftWeight === originalRightWeight) {
          return; // اگر یکسان هستند، نیازی به تعویض نیست
        }

        // برای instance ها
        if (element.type === 'INSTANCE') {
          // بررسی اینکه آیا border properties قابل override هستند
          if (!canOverrideProperty(element, 'strokeLeftWeight') || 
              !canOverrideProperty(element, 'strokeRightWeight')) {
            
            try {
              // تلاش برای override مستقیم
              element.strokeLeftWeight = originalRightWeight;
              element.strokeRightWeight = originalLeftWeight;
              
              console.log('Border weights force-swapped for instance:', element.name);
              
            } catch (instanceError) {
              console.log('Cannot swap border weights for instance:', element.name);
              return detachInstanceIfNeeded(element, 'border weights swap');
            }
            return;
          }
        }

        // برای غیر instance ها یا instance هایی که قابل override هستند
        if (element.type !== 'INSTANCE' || true) {
          const leftWeightBinding = element.boundVariables && element.boundVariables.strokeLeftWeight;
          const rightWeightBinding = element.boundVariables && element.boundVariables.strokeRightWeight;
          
          // حذف binding ها
          try {
            if (leftWeightBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('strokeLeftWeight', null);
            }
            if (rightWeightBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('strokeRightWeight', null);
            }
          } catch (bindingError) {
            // ادامه می‌دهیم
          }
          
          // تعویض مقادیر
          element.strokeLeftWeight = originalRightWeight;
          element.strokeRightWeight = originalLeftWeight;
          
          // تنظیم binding های جدید
          try {
            if (leftWeightBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('strokeRightWeight', leftWeightBinding);
            }
            if (rightWeightBinding && 'setBoundVariable' in element) {
              element.setBoundVariable('strokeLeftWeight', rightWeightBinding);
            }
          } catch (bindingError) {
            // مقادیر به صورت fixed تنظیم شده‌اند
          }
          
          console.log('Border weights swapped for element:', element.name || element.type);
        }
      }
    } catch (error) {
      console.error('خطا در تعویض borders:', error);
      errorCount++;
    }
  }

  // تابع برای تغییر ترتیب children در فریم های افقی
  function reverseChildrenOrder(frame) {
    try {
      if (frame.layoutMode === 'HORIZONTAL' && frame.children.length > 1) {
        const children = [...frame.children];
        children.reverse();
        
        // تغییر ترتیب children
        children.forEach((child, index) => {
          frame.insertChild(index, child);
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('خطا در تغییر ترتیب children:', error);
      errorCount++;
      return false;
    }
  }

  // تابع برای تغییر alignment
  function flipAlignment(frame) {
    try {
      if (frame.layoutMode === 'HORIZONTAL') {
        const primaryAlign = frame.primaryAxisAlignItems;
        
        if (primaryAlign === 'MAX') {
          frame.primaryAxisAlignItems = 'MIN';
        } else if (primaryAlign === 'MIN') {
          frame.primaryAxisAlignItems = 'MAX';
        }
        
      } else if (frame.layoutMode === 'VERTICAL') {
        const counterAlign = frame.counterAxisAlignItems;
        
        if (counterAlign === 'MAX') {
          frame.counterAxisAlignItems = 'MIN';
        } else if (counterAlign === 'MIN') {
          frame.counterAxisAlignItems = 'MAX';
        }
      }
    } catch (error) {
      console.error('خطا در تغییر alignment:', error);
      errorCount++;
    }
  }

  // تابع برای تغییر text alignment و direction - فقط برای متن های خارج از instance
  async function flipTextProperties(textNode) {
    try {
      // بررسی اینکه آیا متن داخل instance است
      if (isInsideInstance(textNode)) {
        console.log('Skipping text inside instance:', textNode.characters.substring(0, 20) + '...');
        textsInInstancesSkipped++;
        return;
      }
      
      await figma.loadFontAsync(textNode.fontName);
      
      // تغییر text alignment
      const currentAlign = textNode.textAlignHorizontal;
      if (currentAlign === 'RIGHT') {
        textNode.textAlignHorizontal = 'LEFT';
      } else if (currentAlign === 'LEFT') {
        textNode.textAlignHorizontal = 'RIGHT';
      }
      
      // تغییر text direction
      const textLength = textNode.characters.length;
      if (textLength > 0) {
        const currentDirection = textNode.getRangeTextDirection(0, textLength);
        
        let newDirection;
        if (currentDirection === 'LEFT_TO_RIGHT') {
          newDirection = 'RIGHT_TO_LEFT';
        } else if (currentDirection === 'RIGHT_TO_LEFT') {
          newDirection = 'LEFT_TO_RIGHT';
        } else {
          newDirection = 'RIGHT_TO_LEFT';
        }
        
        textNode.setRangeTextDirection(0, textLength, newDirection);
      }
      
      processedTexts++;
      
    } catch (error) {
      console.error('خطا در تغییر text properties:', error);
      errorCount++;
    }
  }

  // تابع بازگشتی برای پردازش تمام node ها
  async function processNode(node) {
    try {
      // اگر instance است، فقط corner radius و border پردازش کن و children رو رد کن
      if (node.type === 'INSTANCE') {
        processInstanceOnly(node);
        return; // خروج کامل - هیچ child پردازش نمی‌شه
      }

      // پردازش فریم های Auto Layout (فقط غیر instance ها)
      if (node.type === 'FRAME' || node.type === 'COMPONENT') {
        if ('layoutMode' in node && node.layoutMode !== 'NONE') {
          // برای فریم های افقی
          if (node.layoutMode === 'HORIZONTAL') {
            // تغییر ترتیب children
            reverseChildrenOrder(node);
            
            // تعویض padding
            swapPadding(node);
          }
          
          // تغییر alignment
          flipAlignment(node);
          
          // تعویض corner radius ها
          swapCornerRadius(node);
          
          // تعویض border ها
          swapBorders(node);
          
          processedFrames++;
        }
      }
      
      // پردازش سایر node ها برای corner radius و border (فقط غیر instance ها)
      if (node.type === 'RECTANGLE' || node.type === 'ELLIPSE' || node.type === 'POLYGON' || 
          node.type === 'STAR' || node.type === 'VECTOR' || node.type === 'TEXT' ||
          (node.type === 'FRAME' && (!('layoutMode' in node) || node.layoutMode === 'NONE')) ||
          (node.type === 'COMPONENT' && (!('layoutMode' in node) || node.layoutMode === 'NONE'))) {
        
        swapCornerRadius(node);
        swapBorders(node);
      }
      
      // پردازش text node ها - فقط اگر خارج از instance باشند
      if (node.type === 'TEXT') {
        await flipTextProperties(node);
      }
      
      // پردازش بازگشتی children (فقط اگر instance نباشه)
      if ('children' in node) {
        for (const child of node.children) {
          await processNode(child);
        }
      }
      
    } catch (error) {
      console.error('خطا در پردازش node:', error);
      errorCount++;
    }
  }

  // پردازش تمام node های انتخاب شده
  (async function() {
    for (const node of selection) {
      await processNode(node);
    }

    // نمایش نتیجه
    let message = '';
    if (processedFrames > 0 || processedTexts > 0) {
      message = `✅ پردازش تکمیل شد:`;
      if (processedFrames > 0) {
        message += ` ${processedFrames} فریم`;
      }
      if (processedTexts > 0) {
        message += ` ${processedTexts} متن`;
      }
      if (instancesSkipped > 0) {
        message += ` (${instancesSkipped} instance رد شد)`;
      }
      if (textsInInstancesSkipped > 0) {
        message += ` (${textsInInstancesSkipped} متن داخل instance رد شد)`;
      }
      if (instancesDetached > 0) {
        message += ` (${instancesDetached} instance جدا شد)`;
      }
      if (errorCount > 0) {
        message += ` (${errorCount} خطا)`;
      }
    } else {
      message = '❌ هیچ element قابل پردازشی یافت نشد.';
      if (instancesSkipped > 0) {
        message += ` ${instancesSkipped} instance نیاز به تغییرات دستی دارند.`;
      }
      if (textsInInstancesSkipped > 0) {
        message += ` ${textsInInstancesSkipped} متن داخل instance رد شدند.`;
      }
    }
    
    figma.notify(message);
    figma.closePlugin();
  })();
})();